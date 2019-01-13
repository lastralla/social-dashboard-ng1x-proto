import angular from 'angular';
import { reporting } from '../logic/reporting.js';
import { charts } from '../../../features/charts/logic/charts.js';
import { deepAssign } from '../../../common/utils/deepAssign.js';

let _loggedUser;
let _reportPeriod;
let _reportFilters;

angular
  .module('sdApp.reporting')
  .factory('chartModels', chartModels);

////////// Service Implementation //////////

/* @ngInject */
function chartModels(debounce, loggedUser, reportPeriod, reportFilters) {
  _loggedUser = loggedUser;
  _reportPeriod = reportPeriod;
  _reportFilters = reportFilters;

  const chartModels = {};

  const service = {
    getChartModels: getChartModels
  };

  return service;

  ////////// Exposed Functions //////////

  function getChartModels(reportConfig, reportData) {
    if (!reportData) {
      return {};
    }

    // Delay updating of chart models to accomodate for 250ms animation hardcoded in NVD3 charts
    // debounce utility wraps the buildChartModels() in a promise
    const debouncedBuildFn = debounce(buildChartModels, 250, false);
    const chartModels = debouncedBuildFn(reportConfig, reportData);

    return chartModels;
  }

}

////////// Functions //////////

/*
 * Builds charting models. Takes something like...
 *
 *   "reportConfig" = {
 *     "views": {
 *       "vizName": {
 *         "charts": {
 *           "chart1": {...},
 *           "chart2": {...}
 *         }
 *       }
 *   }
 *
 * and returns...
 *
 *   {
 *     "vizName": {
 *       "show": true|false,
 *       "charts": {
 *         "chart1": {
 *           "type": "NVD3.MultiBar",
 *           "data": {...},
 *           "options": {...}
 *         },
 *         "chart2": {
 *           "type": "SO.SomeOtherType",
 *           "data": {...},
 *           "options": {...}
 *         }
 *       }
 *     }
 *   }
 *
 */
function buildChartModels(reportConfig, reportData) {
  const viewsConf = reportConfig.views;
  const loggedUser = _loggedUser.getLoggedUser();
  const chartModels = {};

  Object.keys(viewsConf).forEach((viewKey) => {
    const viewObj = viewsConf[viewKey];
    const showView = reporting.showView(viewObj, loggedUser);

    chartModels[viewKey] = {
      /* Flag to show/hide panel*/
      show: showView,

      /* Placeholder object */
      charts: {}
    };

    if (!showView) {
      return {};
    }

    const charts = viewObj.charts;

    Object.keys(charts).forEach((chartKey) => {
      const chartData = getChartData(viewObj, reportData[viewKey], chartKey);

      /* Populate charts */
      chartModels[viewKey].charts[chartKey] = {
        type: viewObj.charts[chartKey].type.id,
        data: chartData,
        options: getChartOptions(viewObj.charts[chartKey])
      };
    });
  });

  return chartModels;
}

/*
 * Converts data from regular metric format...
 *
 *   {
 *     "someMetric": [{  // selected period
 *       "name": "someMetric",
 *       "aggregated": {...},
 *       "channels": {
 *         "facebook": {...},
 *         "twitter": {...}
 *       }
 *     }, {  // comparison period
 *       ...
 *     }]
 *   }
 *
 * to a format that can be fed to a chart.
 *
 * For custom SO charts:
 *
 *   {
 *     "someMetric": {
 *       "facebook": [...],
 *       "twitter": [...]
 *     }
 *   }
 *
 * For NVD3 charts:
 *
 *   [{
 *     "key": "facebook",
 *     "values": [{...}, {...}, ...]
 *   }, {
 *     "key": "twitter",
 *     "values": [{...}, {...}, ...]
 *   }]
 *
 */
function getChartData(viewConfObj, viewData, chartKey) {
  const chartObj = viewConfObj.charts[chartKey];
  const filters = _reportFilters.getFilters();
  const chartData = {};

  chartObj.metrics.forEach((metricName) => {
    // console.log('metricName', metricName);
    /* jshint maxcomplexity: 7 */
    const dataMap = viewConfObj.dataMap[metricName];
    const dataSrc = viewData[metricName];
    const valueFormatters = dataMap.formatters || [];

    let postProcessors = [];

    /* Lookup any post processing needed to be done on a metric */
    if (chartObj.postProcessors) {
      if (!chartObj.postProcessors[metricName]) {
        throw new Error('Bad report config. No such method for post processing.');
      }

      postProcessors = chartObj.postProcessors[metricName];
    }

    /* Handle bad report config or backend data not sending right metrics */
    if (!dataSrc || !dataSrc[0]) {
      throw new Error('Bad report config or bad data. Metric ' + metricName + ' not found.');
    }

    let keys;
    let metricData = {};

    /*
     * Get data for each metric configured in dataSrc.
     *
     * For each metric data arrives from backend as array of periods and is remapped to
     * an object mapped by channel.
     */
    dataSrc.forEach((dataForPeriod, index) => {
      // Warning check for data[key] - "best of" metrics (e.g. ads and posts tables) the comparison period may not have data
      if (!dataForPeriod) {
        return;
      }

      const data = dataMap.getter(dataForPeriod, filters);

      // Handle missing data in sorted tables
      if (!data) {
        return;
      }

      /* First time through create proper object structure and add empty arrays */
      if (index === 0) {
        keys = Object.keys(data);
        metricData = buildEmptyMetric(keys);
      }


      keys.forEach((key) => {
        const formattedData = processValue(data[key], valueFormatters);
        metricData[key].push(formattedData);
      });
    });

    /* Apply any post processing to the data for the chart instance */
    metricData = processValue(metricData, postProcessors);

    /*
     * Adapt data to fit the format the chart type needs by calling the
     * adapter function passing metric data and its context (periods)
     */
    if (chartObj.type.adapter) {
      const periodsArr = _reportPeriod.getCurrentPeriodsArray();
      metricData = chartObj.type.adapter(metricData, periodsArr);
    }

    chartData[metricName] = metricData;
  });

  return chartData;

  ////////// Functions //////////

  /*
   * Builds and empty metric for display in the UI
   */
  function buildEmptyMetric(keys) {
    const metricData = {};

    /* build empty value arrays */
    keys.forEach((key) => {
      metricData[key] = [];
    });

    return metricData;
  }

  /*
   * Takes a value and runs it through an array of processors to format data to a different form
   */
  function processValue(value, formatters) {
    if (!value || formatters.length === 0) {
      return value;
    }

    /* Duplicate value to preserve original */
    let formattedVal = JSON.parse(JSON.stringify(value));

    formatters.forEach((formatterFn) => {
      formattedVal = formatterFn(formattedVal);
    });

    return formattedVal;
  }

}

/*
 * Builds a chart's display options
 */
function getChartOptions(chartObj) {
  let options = charts.getBaseChart().options;

  if (!chartObj.type || !chartObj.format) {
    throw new Error('Chart must specify a valid type and format');
  }

  const type =  JSON.parse(JSON.stringify(chartObj.type.options));
  const format = JSON.parse(JSON.stringify(chartObj.format.options));
  const chart = chartObj.options || {};

  /* Extend base options with those added by configuration */
  options = deepAssign(options, type, format, chart);

  return options;
}
