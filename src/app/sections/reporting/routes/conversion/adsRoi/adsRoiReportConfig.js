import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'conversion';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    roi: {
      charts: {
        /* ----- Funnel ----- */
        bars: getAdsRoiBarsConfig(),

        /* ----- Table ----- */
        table: getRoiTableConfig()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getRoiDataMap()
    },

    profit: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getProfitBarsConfig(),

        /* ----- Table ----- */
        table: getProfitTableConfig()
      },

      /* ----- Data Mappings for 'main' visualisation ----- */
      dataMap: getProfitDataMap()
    },

    cost: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getCostBarsConfig(),

        /* ----- Table ----- */
        table: getCostTableConfig()
      },

      dataMap: getCostDataMap()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getAdsRoiBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'roi'
    ],
    postProcessors: {
      roi: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily Breakdown',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {}
      }
    }
  };
} // end getAdsRoiBarsConfig

function getRoiTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'roiValue',
      'roiChangeValue',
      'roiChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'roi',
        collectionKey: 'sum',
        totalValue: 'roiValue',
        comparison: {
          value: 'roiChangeValue',
          percent: 'roiChangePercent'
        }
      }]
    }
  };
} // end getRoiTableConfig

/*
 * Returns the part of the report configuration that configures a chart
 */
function getProfitBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'profit'
    ],
    postProcessors: {
      profit: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily Breakdown',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {}
      }
    }
  };
} // end getProfitBarsConfig

function getProfitTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'profitValue',
      'profitChangeValue',
      'profitChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'profit',
        collectionKey: 'sum',
        totalValue: 'profitValue',
        comparison: {
          value: 'profitChangeValue',
          percent: 'profitChangePercent'
        }
      }]
    }
  };
} // end getProfitTableConfig

function getCostBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'cost'
    ],
    postProcessors: {
      cost: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily Breakdown',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {
          tickFormat: d3.format(',.0f')
        }
      }
    }
  };
} // end getCostBarsConfig

function getCostTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'costValue',
      'costChangeValue',
      'costChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'cost',
        collectionKey: 'sum',
        totalValue: 'costValue',
        comparison: {
          value: 'costChangeValue',
          percent: 'costChangePercent'
        }
      }]
    }
  };
} // end getCostTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getRoiDataMap() {
  return {
    roi: {
      metric: 'roi',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('breakdownValues', 'sum')
    },
    roiValue: {
      metric: 'roi',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    roiChangeValue: {
      metric: 'roi',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    roiChangePercent: {
      metric: 'roi',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('changePercent', 'sum'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getRoiDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getProfitDataMap() {
  return {
    profit: {
      metric: 'profit',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    profitValue: {
      metric: 'profit',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    profitChangeValue: {
      metric: 'profit',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    profitChangePercent: {
      metric: 'profit',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getProfitDataMap

function getCostDataMap() {
  return {
    cost: {
      metric: 'cost',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    costValue: {
      metric: 'cost',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    costChangeValue: {
      metric: 'cost',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    costChangePercent: {
      metric: 'cost',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getCostDataMap
