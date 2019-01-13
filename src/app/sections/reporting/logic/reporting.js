import { commonGetters } from './reporting.commonGetters.js';
import { dataResolvers } from './reporting.dataResolvers.js';
import { dataFormatters } from './reporting.dataFormatters.js';
import { filters } from './reporting.filters.js';
import { query } from './reporting.query.js';

exports.reporting = {
  commonGetters: commonGetters,
  dataResolvers: dataResolvers,
  dataFormatters: dataFormatters,
  filters: filters,
  query: query,

  mapDataToUIStructure: mapDataToUIStructure,
  wantPositiveChange: wantPositiveChange,
  showView: showView
};

/*
 * Takes raw data and a report's views configuration and maps it to
 * an object that matches the visual hierarchy in the report.
 */
function mapDataToUIStructure(viewsConf, rawData) {
  let reportData = {};

  Object.keys(viewsConf).forEach((viewId) => {
    let dataMap = viewsConf[viewId].dataMap;
    reportData[viewId] = {};

    Object.keys(dataMap).forEach((dataMapMetricId) => {
      /* Get the location within the data for each metric */
      let metricName = dataMap[dataMapMetricId].metric;

      /* Build data array from each period */
      let dataArr = [];
      rawData.forEach(function(period) {
        let metric = period.report.find(function(metricObj) {
          /* Find the metric by its name within the array of metrics sent from backend */
          return metricObj.name === metricName;
        });
        dataArr.push(metric);
      });

      /* Store the data by viewId and dataMapMetricId */
      reportData[viewId][dataMapMetricId] = dataArr;
    });
  });

  return reportData;
}

function wantPositiveChange(metricName) {
  /* By default if the change number is greater than zero it is considered a positive trend */
  let positiveChangeIsBetter = true;

  // Some metrics are better when the value decreases over time, e.g. cost
  if (metricName === 'cost') {          // TODO setup a lookup table for metrics that need to trend downwards
    positiveChangeIsBetter = false;
  }

  return positiveChangeIsBetter;
}

/*
 * Checks if a view has any display rules configured that need to be satisfied,
 * if not, the view is shown by default.
 */
function showView(viewObj, userObj) {
  let rules = viewObj.displayRules;
  let show = true; // By default, all visualizations are shown unless specific display rules are configured

  if (rules && Object.keys(rules).length > 0) {
    show = Object.keys(rules).every((condition) => {
      if (typeof rules[condition] === 'function') {
        return rules[condition](userObj);
      } else {
        throw new Error('Display rule needs to be a function');
      }
    });
  }

  return show;
}
