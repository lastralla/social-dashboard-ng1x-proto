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
    webConversionsFunnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getWebConversionsFunnelConfig(),

        /* ----- Table ----- */
        table: getWebConversionsTableConfig()
      },

      dataMap: getWebConversionsFunnelDataMap(),

      displayRules: getGaCheckDisplayRules()
    },

    conversionSSR: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getConversionSSRBarsConfig(),

        /* ----- Table ----- */
        table: getConversionSSRTableConfig()
      },

      dataMap: getConversionSSRDataMap(),

      displayRules: getGaCheckDisplayRules()
    },

    sessionSSR: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getSessionsSSRBarsConfig(),

        /* ----- Table ----- */
        table: getSessionsSSRTableConfig()
      },

      dataMap: getSessionSSRDataMap(),

      displayRules: getGaCheckDisplayRules()
    },

    conversionValue: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getConversionValueBarsConfig(),

        /* ----- Table ----- */
        table: getConversionValueTableConfig()
      },

      dataMap: getConversionValueDataMap(),

      displayRules: getGaCheckDisplayRules()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getWebConversionsFunnelConfig() {
  return {
    type: charts.SD.Types.Funnel,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralPageviewsFunnelValue',
      'GAReferralOnsiteSessionsFunnelValue',
      'GAReferralUsersFunnelValue',
      'conversionVolumeFunnelValue'
    ],
    options: {
      labels: [
        'Page Views',
        'Sessions',
        'Users',
        'Conversions'
      ],
      funnelSequence: [
        'GAReferralPageviewsFunnelValue',
        'GAReferralOnsiteSessionsFunnelValue',
        'GAReferralUsersFunnelValue',
        'conversionVolumeFunnelValue'
      ]
    }
  };
}

function getWebConversionsTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralPageviewsValue',
      'GAReferralPageviewsChangeValue',
      'GAReferralPageviewsChangePercent',

      'GAReferralOnsiteSessionsValue',
      'GAReferralOnsiteSessionsChangeValue',
      'GAReferralOnsiteSessionsChangePercent',

      'GAReferralUsersValue',
      'GAReferralUsersChangeValue',
      'GAReferralUsersChangePercent',

      'conversionVolumeValue',
      'conversionVolumeChangeValue',
      'conversionVolumeChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'GAReferralPageviews',
        collectionKey: 'sum',
        totalValue: 'GAReferralPageviewsValue',
        comparison: {
          value: 'GAReferralPageviewsChangeValue',
          percent: 'GAReferralPageviewsChangePercent'
        }
      }, {
        metricName: 'GAReferralOnsiteSessions',
        collectionKey: 'sum',
        totalValue: 'GAReferralOnsiteSessionsValue',
        comparison: {
          value: 'GAReferralOnsiteSessionsChangeValue',
          percent: 'GAReferralOnsiteSessionsChangePercent'
        }
      }, {
        metricName: 'GAReferralUsers',
        collectionKey: 'sum',
        totalValue: 'GAReferralUsersValue',
        comparison: {
          value: 'GAReferralUsersChangeValue',
          percent: 'GAReferralUsersChangePercent'
        }
      }, {
        metricName: 'conversionVolume',
        collectionKey: 'sum',
        totalValue: 'conversionVolumeValue',
        comparison: {
          value: 'conversionVolumeChangeValue',
          percent: 'conversionVolumeChangePercent'
        }
      }]
    }
  };
} // end getWebConversionsTableConfig

/*
 * Returns the part of the report configuration that configures a chart
 */
function getConversionSSRBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'GAReferralConversionVolume'
    ],
    postProcessors: {
      GAReferralConversionVolume: [
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
} // end getConversionSSRBarsConfig

function getConversionSSRTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralConversionVolumeValue',
      'GAReferralConversionVolumeChangeValue',
      'GAReferralConversionVolumeChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'GAReferralConversionVolume',
        collectionKey: 'sum',
        totalValue: 'GAReferralConversionVolumeValue',
        comparison: {
          value: 'GAReferralConversionVolumeChangeValue',
          percent: 'GAReferralConversionVolumeChangePercent'
        }
      }]
    }
  };
} // end getConversionSSRTableConfig

function getSessionsSSRBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'GAReferralSessions'
    ],
    postProcessors: {
      GAReferralSessions: [
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
} // end getSessionsSSRBarsConfig

function getSessionsSSRTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralSessionsValue',
      'GAReferralSessionsChangeValue',
      'GAReferralSessionsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'GAReferralSessions',
        collectionKey: 'sum',
        totalValue: 'GAReferralSessionsValue',
        comparison: {
          value: 'GAReferralSessionsChangeValue',
          percent: 'GAReferralSessionsChangePercent'
        }
      }]
    }
  };
} // end getSessionsSSRTableConfig

function getConversionValueBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'GAReferralConversionValue'
    ],
    postProcessors: {
      GAReferralConversionValue: [
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
} // end getConversionValueBarsConfig

function getConversionValueTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralConversionValueValue',
      'GAReferralConversionValueChangeValue',
      'GAReferralConversionValueChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'GAReferralConversionValue',
        collectionKey: 'sum',
        totalValue: 'GAReferralConversionValueValue',
        comparison: {
          value: 'GAReferralConversionValueChangeValue',
          percent: 'GAReferralConversionValueChangePercent'
        }
      }]
    }
  };
} // end getConversionValueTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getWebConversionsFunnelDataMap() {
  return {
    GAReferralPageviewsFunnelValue: {
      metric: 'GAReferralPageviews',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    GAReferralOnsiteSessionsFunnelValue: {
      metric: 'GAReferralOnsiteSessions',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    GAReferralUsersFunnelValue: {
      metric: 'GAReferralUsers',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    conversionVolumeFunnelValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },

    GAReferralPageviewsValue: {
      metric: 'GAReferralPageviews',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralPageviewsChangeValue: {
      metric: 'GAReferralPageviews',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralPageviewsChangePercent: {
      metric: 'GAReferralPageviews',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    GAReferralOnsiteSessionsValue: {
      metric: 'GAReferralOnsiteSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralOnsiteSessionsChangeValue: {
      metric: 'GAReferralOnsiteSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralOnsiteSessionsChangePercent: {
      metric: 'GAReferralOnsiteSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    GAReferralUsersValue: {
      metric: 'GAReferralUsers',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralUsersChangeValue: {
      metric: 'GAReferralUsers',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralUsersChangePercent: {
      metric: 'GAReferralUsers',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    conversionVolumeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    conversionVolumeChangeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    conversionVolumeChangePercent: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getWebConversionsFunnelDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getConversionSSRDataMap() {
  return {
    GAReferralConversionVolume: {
      metric: 'GAReferralConversionVolume',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    GAReferralConversionVolumeValue: {
      metric: 'GAReferralConversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralConversionVolumeChangeValue: {
      metric: 'GAReferralConversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralConversionVolumeChangePercent: {
      metric: 'GAReferralConversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getConversionSSRDataMap

function getSessionSSRDataMap() {
  return {
    GAReferralSessions: {
      metric: 'GAReferralSessions',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    GAReferralSessionsValue: {
      metric: 'GAReferralSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralSessionsChangeValue: {
      metric: 'GAReferralSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralSessionsChangePercent: {
      metric: 'GAReferralSessions',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getSessionSSRDataMap

function getConversionValueDataMap() {
   return {
    GAReferralConversionValue: {
      metric: 'GAReferralConversionValue',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    GAReferralConversionValueValue: {
      metric: 'GAReferralConversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    GAReferralConversionValueChangeValue: {
      metric: 'GAReferralConversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    GAReferralConversionValueChangePercent: {
      metric: 'GAReferralConversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getConversionValueDataMap

/* ---------------------------------------------------- */
/* ----------- Visualization Display Rules ------------ */
/* ---------------------------------------------------- */

function getGaCheckDisplayRules() {
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
