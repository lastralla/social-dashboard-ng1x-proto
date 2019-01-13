import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'referral';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    webSessionFunnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getFunnelConfig(),

        /* ----- Table ----- */
        table: getFunnelTableConfig()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getFunnelDataMap(),

      displayRules: getGaCheckDisplayRules()
    },

    ssr: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getSSRBarsConfig(),

        /* ----- Table ----- */
        table: getSSRTableConfig()
      },

      dataMap: getSSRDataMap(),

      displayRules: getGaCheckDisplayRules()
    },

    pwc: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getPWCBarsConfig(),

        /* ----- Table ----- */
        table: getPWCTableConfig()
      },

      dataMap: getPWCDataMap()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getFunnelConfig() {
  return {
    type: charts.SD.Types.Funnel,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralPageviewsFunnelValue',
      'GAReferralSessionsFunnelValue',
      'GAReferralUsersFunnelValue',
      'GAReferralOnsiteSessionsFunnelValue'
    ],
    options: {
      labels: [
        'Page Views',
        'Sessions',
        'Users',
        'On-site Sessions'
      ],
      funnelSequence: [
        'GAReferralPageviewsFunnelValue',
        'GAReferralSessionsFunnelValue',
        'GAReferralUsersFunnelValue',
        'GAReferralOnsiteSessionsFunnelValue'
      ]
    }
  };
} // end getFunnelConfig

function getFunnelTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'GAReferralPageviewsValue',
      'GAReferralPageviewsChangeValue',
      'GAReferralPageviewsChangePercent',

      'GAReferralSessionsValue',
      'GAReferralSessionsChangeValue',
      'GAReferralSessionsChangePercent',

      'GAReferralUsersValue',
      'GAReferralUsersChangeValue',
      'GAReferralUsersChangePercent',

      'GAReferralOnsiteSessionsValue',
      'GAReferralOnsiteSessionsChangeValue',
      'GAReferralOnsiteSessionsChangePercent'
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
        metricName: 'GAReferralSessions',
        collectionKey: 'sum',
        totalValue: 'GAReferralSessionsValue',
        comparison: {
          value: 'GAReferralSessionsChangeValue',
          percent: 'GAReferralSessionsChangePercent'
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
        metricName: 'GAReferralOnsiteSessions',
        collectionKey: 'sum',
        totalValue: 'GAReferralOnsiteSessionsValue',
        comparison: {
          value: 'GAReferralOnsiteSessionsChangeValue',
          percent: 'GAReferralOnsiteSessionsChangePercent'
        }
      }]
    }
  };
} // end getFunnelTableConfig

/*
 * Returns the part of the report configuration that configures a chart
 */
function getSSRBarsConfig() {
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
} // end getSSRBarsConfig

function getSSRTableConfig() {
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
} // end getSSRTableConfig

function getPWCBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'clicks'
    ],
    postProcessors: {
      clicks: [
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
} // end getPWCBarsConfig

function getPWCTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'clicksValue',
      'clicksChangeValue',
      'clicksChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'clicks',
        collectionKey: 'sum',
        totalValue: 'clicksValue',
        comparison: {
          value: 'clicksChangeValue',
          percent: 'clicksChangePercent'
        }
      }]
    }
  };
} // end getPWCTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getFunnelDataMap() {
  return {
    GAReferralPageviewsFunnelValue: {
      metric: 'GAReferralPageviews',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    GAReferralSessionsFunnelValue: {
      metric: 'GAReferralSessions',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    GAReferralUsersFunnelValue: {
      metric: 'GAReferralUsers',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    GAReferralOnsiteSessionsFunnelValue: {
      metric: 'GAReferralOnsiteSessions',
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
    }
  };
} // end getFunnelDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getSSRDataMap() {
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
} // end getSSRDataMap

function getPWCDataMap() {
  return {
    clicks: {
      metric: 'clicks',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    clicksValue: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    clicksChangeValue: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    clicksChangePercent: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getPWCDataMap

/* ---------------------------------------------------- */
/* ----------- Visualization Display Rules ------------ */
/* ---------------------------------------------------- */

/*
 * Returns display rule(s) to be satisfied for the view.
 */
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
