import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'community';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    communityFunnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getCommunityFunnelConfig(),

        /* ----- Table ----- */
        table: getCommunityFunnelTable()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getCommunityFunnelMap()
    },

    main: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getMainChart1Config(),

        /* ----- Table ----- */
        table: getCommunityValueTable()
      },

      /* ----- Data Mappings for 'main' visualisation ----- */
      dataMap: getMainDataMap()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getCommunityFunnelConfig() {
  return {
    type: charts.SD.Types.Funnel,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsFunnelValue',
      'reachFunnelValue',
      'actionsFunnelValue',
      'fansFunnelValue'
    ],
    options: {
      labels: [
        'Impressions',
        'Reach',
        'Actions',
        'New Fans (Ads)'
      ],
      funnelSequence: [
        'impressionsFunnelValue',
        'reachFunnelValue',
        'actionsFunnelValue',
        'fansFunnelValue'
      ]
    }
  };
} // end getCommunityFunnelTable

function getCommunityFunnelTable() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsValue', 'impressionsChangeValue', 'impressionsChangePercent',
      'reachValue', 'reachChangeValue', 'reachChangePercent',
      'actionsValue', 'actionsChangeValue', 'actionsChangePercent',
      'fansValue', 'fansChangeValue', 'fansChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'impressions',
        collectionKey: 'sum',
        totalValue: 'impressionsValue',
        comparison: {
          value: 'impressionsChangeValue',
          percent: 'impressionsChangePercent'
        }
      }, {
        metricName: 'reach',
        collectionKey: 'sum',
        totalValue: 'reachValue',
        comparison: {
          value: 'reachChangeValue',
          percent: 'reachChangePercent'
        }
      }, {
        metricName: 'actions',
        collectionKey: 'sum',
        totalValue: 'actionsValue',
        comparison: {
          value: 'actionsChangeValue',
          percent: 'actionsChangePercent'
        }
      }, {
        metricName: 'fans',
        collectionKey: 'sum',
        totalValue: 'fansValue',
        comparison: {
          value: 'fansChangeValue',
          percent: 'fansChangePercent'
        }
      }]
    }
  };
} // end getCommunityFunnelTable

/*
 * Returns the part of the report configuration that configures a chart
 */
function getMainChart1Config() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'fans'
    ],
    postProcessors: {
      fans: [
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
} // end getMainChart1Config

function getCommunityValueTable() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'fansValue',
      'fansChangeValue',
      'fansChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'fans',
        collectionKey: 'sum',
        totalValue: 'fansValue',
        comparison: {
          value: 'fansChangeValue',
          percent: 'fansChangePercent'
        }
      }]
    }
  };
} // end getCommunityValueTable

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getCommunityFunnelMap() {
  return {
    impressionsFunnelValue: {
      metric: 'impressions',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    reachFunnelValue: {
      metric: 'reach',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    actionsFunnelValue: {
      metric: 'actions',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    fansFunnelValue: {
      metric: 'fans',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },

    impressionsValue: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    impressionsChangeValue: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    impressionsChangePercent: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    reachValue: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    reachChangeValue: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    reachChangePercent: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    actionsValue: {
      metric: 'actions',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    actionsChangeValue: {
      metric: 'actions',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    actionsChangePercent: {
      metric: 'actions',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    fansValue: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    fansChangeValue: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    fansChangePercent: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getCommunityFunnelMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getMainDataMap() {
  return {
    fans: {
      metric: 'fans',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    fansValue: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    fansChangeValue: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    fansChangePercent: {
      metric: 'fans',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getMainDataMap
