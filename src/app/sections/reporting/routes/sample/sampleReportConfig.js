import { reporting } from '../../logic/reporting.js';
import { charts } from '../../../../features/charts/logic/charts.js';

let reportTopic = 'sample';
let commonGetters = reporting.commonGetters;
let dataResolvers = reporting.dataResolvers;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  /*
   * Temporarily all metrics returned together under one topic;
   * 'sample' for fake metrics, real metric TODO.
   *
   * Stub server only returns data for either 'report' topic or 'sample' topic
   * and returns object as follows...
   *   [{
   *     "period": {},
   *     "<topic name>": {} // key is sample|conversion|referral|engagement|community
   *   }, {
   *     "period": {},
   *     "<topic name>": {} // key is sample|conversion|referral|engagement|community
   *   }]
   */
  views: {
    /* ------------------------------------------------------ */
    /* ---------- Visualisations for Insights --------------- */
    /* ------------------------------------------------------ */
    insights: {
      charts: {
        /* ----- Small Bar Chart ----- */
        chart1insights: getInsightsChart1Config(),

        /* ----- Table ----- */
        chart2insights: getInsightsChart2Config()
      },

      /* ----- Data Mappings for 'secondary' visualisation ----- */
      dataMap: getInsightsDataMap(),

      /* ----- Conditional display rules ----- */
      displayRules: getInsightsDisplayRules()
    },

    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    main: {
      charts: {
        /* ----- Bar Chart ----- */
        chart1main: getMainChart1Config(),

        /* ----- Table ----- */
        chart2main: getMainChart2Config()
      },

      /* ----- Data Mappings for 'main' visualisation ----- */
      dataMap: getMainDataMap()
    },

    /* ------------------------------------------------------ */
    /* ------------- Another Visualisation ------------------ */
    /* ------------------------------------------------------ */
    secondary: {
      charts: {
        /* ----- Small Bar Chart ----- */
        chart1sec: getSecondaryChart1Config(),

        /* ----- Table ----- */
        chart2sec: getSecondaryChart2Config()
      },

      /* ----- Data Mappings for 'secondary' visualisation ----- */
      dataMap: getSecondaryDataMap()
    }
  }
};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

/*
 * Returns the part of the report configuration that configures a chart
 */
function getMainChart1Config() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'dailySentiment'
    ],
    postProcessors: {
      dailySentiment: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {
          axisLabel: 'Sentiment'
        }
      }
    }
  };
} // end getMainChart1Config

/*
 * Returns the part of the report configuration that configures a chart
 */
function getMainChart2Config() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'sentimentValue',
      'sentimentChangeValue',
      'sentimentChangePercent',
      'salesRevenueValue',
      'salesRevenueChangeValue',
      'salesRevenueChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      selectedLabel: 'selected',
      comparisonLabel: 'comparison',

      metricSets: [{
        metricName: 'sentiment',
        collectionKey: 'sum',
        totalValue: 'sentimentValue',
        comparison: {
          value: 'sentimentChangeValue',
          percent: 'sentimentChangePercent'
        }
      }, {
        metricName: 'salesRevenue',
        collectionKey: 'sum',
        totalValue: 'salesRevenueValue',
        comparison: {
          value: 'salesRevenueChangeValue',
          percent: 'salesRevenueChangePercent'
        }
      }]
    }
  };
} // end getMainChart2Config

/*
 * Returns the part of the report configuration that configures a chart
 */
function getSecondaryChart1Config() {
  return {
    type: charts.NVD3.Types.MonthlyBars,
    format: charts.NVD3.Formats.Small,
    metrics: [
      'salesRevenueValue'
    ],
    postProcessors: {
      salesRevenueValue: [
        dataFormatters.orderPeriodsChronologically
      ]
    },
    options: {
      chart: {
        xAxis: {
          tickFormat: chartUtils.monthTicksFactory()
        },
        yAxis: {
          axisLabel: 'Thousands'
        }
      }
    }
  };
} // end getSecondaryChart1Config

/*
 * Returns the part of the report configuration that configures a chart
 */
function getSecondaryChart2Config() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Large,
    metrics: [
      'salesRevenueValueSummed',
      'salesRevenueChangeValue',
      'salesRevenueChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'salesRevenue',
        collectionKey: 'sum',
        totalValue: 'salesRevenueValueSummed',
        comparison: {
          value: 'salesRevenueChangeValue',
          percent: 'salesRevenueChangePercent'
        }
      }]
    }
  };
} // end getSecondaryChart2Config

/*
 * Returns the part of the report configuration that configures a chart
 */
function getInsightsChart1Config() {
  return {
    type: charts.NVD3.Types.MonthlyBars,
    format: charts.NVD3.Formats.Small,
    metrics: [
      'gaAdConversion'
    ],
    postProcessors: {
      gaAdConversion: [
        dataFormatters.orderPeriodsChronologically
      ]
    },
    options: {
      chart: {
        xAxis: {
          tickFormat: chartUtils.monthTicksFactory()
        },
        yAxis: {
          axisLabel: 'Conversions'
        }
      }
    }
  };
} // end getInsightsChart1Config

/*
 * Returns the part of the report configuration that configures a chart
 */
function getInsightsChart2Config() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Large,
    metrics: [
      'gaAdConversionValue',
      'gaAdConversionChangeValue',
      'gaAdConversionChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'gaAdConversion',
        collectionKey: 'sum',
        totalValue: 'gaAdConversionValue',
        comparison: {
          value: 'gaAdConversionChangeValue',
          percent: 'gaAdConversionChangePercent'
        }
      }]
    }
  };
} // end getInsightsChart2Config

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getMainDataMap() {
  return {
    dailySentiment: {
      metric: 'sentiment',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('breakdownValues')
    },
    sentimentValue: {
      metric: 'sentiment',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('totalValue', 'sum') // TODO could the key be 'all'?
    },
    sentimentChangeValue: {
      metric: 'sentiment',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('changeValue', 'sum') // TODO could the key be 'all'?
    },
    sentimentChangePercent: {
      metric: 'sentiment',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('changePercent', 'sum'), // TODO could the key be 'all'?
      formatters: []
    },

    salesRevenueValue: {
      metric: 'salesRevenue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    salesRevenueChangeValue: {
      metric: 'salesRevenue',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    salesRevenueChangePercent: {
      metric: 'salesRevenue',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('changePercent', 'sum'), // Warning: the key must be 'sum'
      formatters: []
    }

  };

} // end getMainDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getSecondaryDataMap() {
  return {
    salesRevenueValue: {
      metric: 'salesRevenue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    salesRevenueValueSummed: {
      metric: 'salesRevenue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    salesRevenueChangeValue: {
      metric: 'salesRevenue',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    salesRevenueChangePercent: {
      metric: 'salesRevenue',
      getter: commonGetters.getFromAggregatedOrChannelsGetter('changePercent', 'sum'), // Warning: the key must be 'sum'
      formatters: []
    }
  };

} // end getSecondaryDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getInsightsDataMap() {
  return {
    gaAdConversion: {
      metric: 'gaAdConversion',
      // getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
      getter: function getOnlyFromChannelsGetter(metric, filtersState) {
        let channels;

        // if (reporting.filters.hasNoActiveState(filtersState.channels)) {
        /* No channel filter, get all channels */
        channels = reporting.filters.getAvailableFilterStates(filtersState.channels);
        // } else {
        //   /* Filtered by channel, get only active channel */
        //   channels = reporting.filters.getActiveState(filtersState.channels);
        // }

        return dataResolvers.getChannelValues(channels, metric, 'totalValue');
      }
    },

    gaAdConversionValue: {
      metric: 'gaAdConversion',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },

    gaAdConversionChangeValue: {
      metric: 'gaAdConversion',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
      // getter: function(metric) {
      //   return dataResolvers.addAggregatedChannelValues(metric, 'changeValue');
      // }
    },

    gaAdConversionChangePercent: {
      metric: 'gaAdConversion',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      // getter: function(metric) {
      //   return dataResolvers.addAggregatedChannelValues(metric, 'changePercent'); // from aggregated?
      // },
      formatters: []
    }
  };

} // end getInsightsDataMap

/* ---------------------------------------------------- */
/* ----------- Visualization Display Rules ------------ */
/* ---------------------------------------------------- */

/*
 * Returns display rule(s) to be satisfied for the view.
 */
function getInsightsDisplayRules() {
  return {
    isActive: function(userObj) {
      let activeBrand = userObj.brands[userObj.activeBrand];
      if (activeBrand.integrations.indexOf('ga') >= 0) {
        return true;
      }

      return false;
    }
  };
}
