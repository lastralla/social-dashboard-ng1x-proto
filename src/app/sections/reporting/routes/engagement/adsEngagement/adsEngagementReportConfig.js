import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'engagement';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    engagementFunnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getEngagementFunnelConfig(),

        /* ----- Table ----- */
        table: getEngagementFunnelTableConfig()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getEngagementFunnelMap(),
    },

    adsEngagement: {
      charts: {
        bars: getAdsEngagementBarsConfig(),

        table: getAdsEngagementTableConfig()
      },

      dataMap: getAdsEngagementDataMap()
    },

    amplifications: {
      charts: {
        bars: getAmplificationsBarsConfig(),

        table: getAmplificationsTableConfig()
      },

      dataMap: getAmplificationsDataMap()
    },

    adLikes: {
      charts: {
        bars: getAdLikesBarsConfig(),

        table: getAdLikesTableConfig()
      },

      dataMap: getAdLikesDataMap()
    },

    conversations: {
      charts: {
        bars: getConversationsBarsConfig(),

        table: getConversationsTableConfig()
      },

      dataMap: getConversationsDataMap()
    }

  }
};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getEngagementFunnelConfig() {
  return {
    type: charts.SD.Types.Funnel,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsFunnelValue',
      'reachFunnelValue',
      'actionsFunnelValue',
      'engagementsFunnelValue'
    ],
    options: {
      labels: [
        'Impressions',
        'Reach',
        'Actions',
        'Engagements'
      ],
      funnelSequence: [
        'impressionsFunnelValue',
        'reachFunnelValue',
        'actionsFunnelValue',
        'engagementsFunnelValue'
      ]
    }
  };
}

/*
 * Returns the part of the report configuration that configures a chart
 */
function getEngagementFunnelTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsValue', 'impressionsChangeValue', 'impressionsChangePercent',
      'reachValue', 'reachChangeValue', 'reachChangePercent',
      'actionsValue', 'actionsChangeValue', 'actionsChangePercent',
      'engagementsValue', 'engagementsChangeValue', 'engagementsChangePercent'
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
        metricName: 'engagements',
        collectionKey: 'sum',
        totalValue: 'engagementsValue',
        comparison: {
          value: 'engagementsChangeValue',
          percent: 'engagementsChangePercent'
        }
      }]
    }
  };
} // end getEngagementFunnelTableConfig

function getAdsEngagementBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'engagements'
    ],
    postProcessors: {
      engagements: [
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
} // end getAdsEngagementBarsConfig

function getAdsEngagementTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'engagementsValue', 'engagementsChangeValue', 'engagementsChangePercent',
      'costValue', 'costChangeValue', 'costChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'engagements',
        collectionKey: 'sum',
        totalValue: 'engagementsValue',
        comparison: {
          value: 'engagementsChangeValue',
          percent: 'engagementsChangePercent'
        }
      }, {
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
} // end getAdsEngagementTableConfig

function getAmplificationsBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'shares'
    ],
    postProcessors: {
      shares: [
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
} // end getAmplificationsBarsConfig

function getAmplificationsTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'sharesValue', 'sharesChangeValue', 'sharesChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'shares',
        collectionKey: 'sum',
        totalValue: 'sharesValue',
        comparison: {
          value: 'sharesChangeValue',
          percent: 'sharesChangePercent'
        }
      }]
    }
  };
} // end getAmplificationsTableConfig

function getAdLikesBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'likes'
    ],
    postProcessors: {
      likes: [
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
} // end getAdLikesBarsConfig

function getAdLikesTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'likesValue', 'likesChangeValue', 'likesChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'likes',
        collectionKey: 'sum',
        totalValue: 'likesValue',
        comparison: {
          value: 'likesChangeValue',
          percent: 'likesChangePercent'
        }
      }]
    }
  };
} // end getAdLikesTableConfig

function getConversationsBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'comments'
    ],
    postProcessors: {
      comments: [
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
} // end getConversationsBarsConfig

function getConversationsTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'commentsValue', 'commentsChangeValue', 'commentsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'comments',
        collectionKey: 'sum',
        totalValue: 'commentsValue',
        comparison: {
          value: 'commentsChangeValue',
          percent: 'commentsChangePercent'
        }
      }]
    }
  };
} // end getConversationsTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getEngagementFunnelMap() {
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
    engagementsFunnelValue: {
      metric: 'engagements',
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

    engagementsValue: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    engagementsChangeValue: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    engagementsChangePercent: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getEngagementFunnelMap

function getAdsEngagementDataMap() {
  return {
    engagements: {
      metric: 'engagements',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    engagementsValue: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    engagementsChangeValue: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    engagementsChangePercent: {
      metric: 'engagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
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
} // end getAdsEngagementDataMap

function getAmplificationsDataMap() {
  return {
    shares: {
      metric: 'shares',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    sharesValue: {
      metric: 'shares',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    sharesChangeValue: {
      metric: 'shares',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    sharesChangePercent: {
      metric: 'shares',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getAmplificationsDataMap

function getAdLikesDataMap() {
  return {
    likes: {
      metric: 'likes',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    likesValue: {
      metric: 'likes',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    likesChangeValue: {
      metric: 'likes',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    likesChangePercent: {
      metric: 'likes',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getAdLikesDataMap

function getConversationsDataMap() {
  return {
    comments: {
      metric: 'comments',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    commentsValue: {
      metric: 'comments',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    commentsChangeValue: {
      metric: 'comments',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    commentsChangePercent: {
      metric: 'comments',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getConversationsDataMap

