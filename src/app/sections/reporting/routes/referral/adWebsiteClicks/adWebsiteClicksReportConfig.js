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
    funnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getFunnelConfig(),

        /* ----- Table ----- */
        table: getFunnelTableConfig()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getFunnelDataMap()
    },

    clicks: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getClicksBarsConfig(),

        /* ----- Table ----- */
        table: getClicksTableConfig()
      },

      dataMap: getClicksDataMap()
    },

    costs: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getCostsBarsConfig(),

        /* ----- Table ----- */
        table: getCostsTableConfig()
      },

      dataMap: getCostsDataMap()
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
      'impressionsFunnelValue',
      'reachFunnelValue',
      'actionsFunnelValue',
      'clicksFunnelValue'
    ],
    options: {
      labels: [
        'Impressions',
        'Reach',
        'Paid Actions',
        'Website Clicks'
      ],
      funnelSequence: [
        'impressionsFunnelValue',
        'reachFunnelValue',
        'actionsFunnelValue',
        'clicksFunnelValue'
      ]
    }
  };
}

function getFunnelTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsValue', 'impressionsChangeValue', 'impressionsChangePercent',
      'reachValue', 'reachChangeValue', 'reachChangePercent',
      'actionsValue', 'actionsChangeValue', 'actionsChangePercent',
      'clicksValue', 'clicksChangeValue', 'clicksChangePercent'
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
} // end getFunnelTableConfig

/*
 * Returns the part of the report configuration that configures a chart
 */
function getClicksBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'linkClicks'
    ],
    postProcessors: {
      linkClicks: [
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
} // end getClicksBarsConfig

function getClicksTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'linkClicksValue',
      'linkClicksChangeValue',
      'linkClicksChangePercent',

      'isMyLinkValue',
      'isMyLinkChangeValue',
      'isMyLinkChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'linkClicks',
        collectionKey: 'sum',
        totalValue: 'linkClicksValue',
        comparison: {
          value: 'linkClicksChangeValue',
          percent: 'linkClicksChangePercent'
        }
      }, {
        metricName: 'isMyLink',
        collectionKey: 'sum',
        totalValue: 'isMyLinkValue',
        comparison: {
          value: 'isMyLinkChangeValue',
          percent: 'isMyLinkChangePercent'
        }

        // unknown metric, wireframe shows "Paid Link Clicks to Other Sites"
        // }, {
        // metricName: 'conversionValue',
        // collectionKey: 'sum',
        // totalValue: 'conversionValueValue',
        // comparison: {
        //   value: 'conversionValueChangeValue',
        //   percent: 'conversionValueChangePercent'
        // }
      }]
    }
  };
} // end getClicksTableConfig

function getCostsBarsConfig() {
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
} // end getCostsBarsConfig

function getCostsTableConfig() {
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
} // end getCostsTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getFunnelDataMap() {
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
    clicksFunnelValue: {
      metric: 'clicks',
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
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
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
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
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
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
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
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
    }
  };
} // end getFunnelDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getClicksDataMap() {
  return {
    linkClicks: {
      metric: 'linkClicks',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    linkClicksValue: {
      metric: 'linkClicks',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    linkClicksChangeValue: {
      metric: 'linkClicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    linkClicksChangePercent: {
      metric: 'linkClicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
    },

    isMyLink: {
      metric: 'isMyLink',
      getter: commonGetters.getOnlyFromChannelsGetter('breakdownValues')
    },
    isMyLinkValue: {
      metric: 'isMyLink',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    isMyLinkChangeValue: {
      metric: 'isMyLink',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    isMyLinkChangePercent: {
      metric: 'isMyLink',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
    }
  };
} // end getClicksDataMap

function getCostsDataMap() {
  return {
    cost: {
      metric: 'cost',
      getter: commonGetters.getOnlyFromChannelsGetter('breakdownValues')
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
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent')
    }
  };
} // end getCostsDataMap
