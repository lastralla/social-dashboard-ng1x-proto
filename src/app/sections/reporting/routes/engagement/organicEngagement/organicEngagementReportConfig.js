import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'engagement';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let dataResolvers = reporting.dataResolvers;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {

    insights: {
      charts: {
        bars: getInsightsBarsConfig(),

        table: getInsightsTableConfig()
      },

      dataMap: getInsightsDataMap()
    },

    organicEngagements: {
      charts: {
        bars: getOrganicEngagementBarsConfig(),

        table: getOrganicEngagementTableConfig()
      },

      dataMap: getOrganicEngagementDataMap()
    },

    amplifications: {
      charts: {
        bars: getAmplificationsBarsConfig(),

        table: getAmplificationsTableConfig()
      },

      dataMap: getAmplificationsDataMap()
    },

    organicLikes: {
      charts: {
        bars: getOrganicLikesBarsConfig(),

        table: getOrganicLikesTableConfig()
      },

      dataMap: getOrganicLikesDataMap()
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

function getInsightsBarsConfig() {
  return {
    type: charts.NVD3.Types.MonthlyBars,
    format: charts.NVD3.Formats.Small,
    metrics: [
      'organicEngagements'
    ],
    postProcessors: {
      organicEngagements: [
        dataFormatters.orderPeriodsChronologically
      ]
    },
    options: {
      chart: {
        xAxis: {
          tickFormat: chartUtils.monthTicksFactory()
        },
        yAxis: {
          axisLabel: 'Organic Engagements',
          tickFormat: d3.format(',.0f')
        }
      }
    }
  };
} // end getInsightsBarsConfig

function getInsightsTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Large,
    metrics: [
      'organicFacebookSharesValue',
      'organicFacebookSharesChangeValue',
      'organicFacebookSharesChangePercent',
      'organicTwitterSharesValue',
      'organicTwitterSharesChangeValue',
      'organicTwitterSharesChangePercent',

      'organicFacebookLikesValue',
      'organicFacebookLikesChangeValue',
      'organicFacebookLikesChangePercent',
      'organicTwitterLikesValue',
      'organicTwitterLikesChangeValue',
      'organicTwitterLikesChangePercent',

      'organicFacebookCommentsValue',
      'organicFacebookCommentsChangeValue',
      'organicFacebookCommentsChangePercent',
      'organicTwitterCommentsValue',
      'organicTwitterCommentsChangeValue',
      'organicTwitterCommentsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'facebookShares',
        collectionKey: 'sum',
        totalValue: 'organicFacebookSharesValue',
        comparison: {
          value: 'organicFacebookSharesChangeValue',
          percent: 'organicFacebookSharesChangePercent'
        }
      }, {
        metricName: 'twitterShares',
        collectionKey: 'sum',
        totalValue: 'organicTwitterSharesValue',
        comparison: {
          value: 'organicTwitterSharesChangeValue',
          percent: 'organicTwitterSharesChangePercent'
        }
      }, {
        metricName: 'facebookLikes',
        collectionKey: 'sum',
        totalValue: 'organicFacebookLikesValue',
        comparison: {
          value: 'organicFacebookLikesChangeValue',
          percent: 'organicFacebookLikesChangePercent'
        }
      }, {
        metricName: 'twitterLikes',
        collectionKey: 'sum',
        totalValue: 'organicTwitterLikesValue',
        comparison: {
          value: 'organicTwitterLikesChangeValue',
          percent: 'organicTwitterLikesChangePercent'
        }
      }, {
        metricName: 'facebookComments',
        collectionKey: 'sum',
        totalValue: 'organicFacebookCommentsValue',
        comparison: {
          value: 'organicFacebookCommentsChangeValue',
          percent: 'organicFacebookCommentsChangePercent'
        }
      }, {
        metricName: 'twitterComments',
        collectionKey: 'sum',
        totalValue: 'organicTwitterCommentsValue',
        comparison: {
          value: 'organicTwitterCommentsChangeValue',
          percent: 'organicTwitterCommentsChangePercent'
        }
      }]
    }
  };
} // end getInsightsTableConfig

function getOrganicEngagementBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'organicEngagements'
    ],
    postProcessors: {
      organicEngagements: [
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
} // end getOrganicEngagementBarsConfig

function getOrganicEngagementTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'organicEngagementsValue',
      'organicEngagementsChangeValue',
      'organicEngagementsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'organicEngagements',
        collectionKey: 'sum',
        totalValue: 'organicEngagementsValue',
        comparison: {
          value: 'organicEngagementsChangeValue',
          percent: 'organicEngagementsChangePercent'
        }
      }]
    }
  };
} // end getOrganicEngagementTableConfig

function getAmplificationsBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'organicShares'
    ],
    postProcessors: {
      organicShares: [
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
      'organicSharesValue', 'organicSharesChangeValue', 'organicSharesChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'organicShares',
        collectionKey: 'sum',
        totalValue: 'organicSharesValue',
        comparison: {
          value: 'organicSharesChangeValue',
          percent: 'organicSharesChangePercent'
        }
      }]
    }
  };
} // end getAmplificationsTableConfig

function getOrganicLikesBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'organicLikes'
    ],
    postProcessors: {
      organicLikes: [
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
} // end getOrganicLikesBarsConfig

function getOrganicLikesTableConfig() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'organicLikesValue', 'organicLikesChangeValue', 'organicLikesChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'organicLikes',
        collectionKey: 'sum',
        totalValue: 'organicLikesValue',
        comparison: {
          value: 'organicLikesChangeValue',
          percent: 'organicLikesChangePercent'
        }
      }]
    }
  };
} // end getOrganicLikesTableConfig

function getConversationsBarsConfig() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'organicComments'
    ],
    postProcessors: {
      organicComments: [
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
      'organicCommentsValue', 'organicCommentsChangeValue', 'organicCommentsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'organicComments',
        collectionKey: 'sum',
        totalValue: 'organicCommentsValue',
        comparison: {
          value: 'organicCommentsChangeValue',
          percent: 'organicCommentsChangePercent'
        }
      }]
    }
  };
} // end getConversationsTableConfig

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

function getInsightsDataMap() {
  return {
    organicEngagements: {
      metric: 'organicEngagements',
      getter: function(metric) {
        let channels = ['facebook', 'twitter'];
        return dataResolvers.getChannelValues(channels, metric, 'totalValue');
      }
    },

    organicFacebookSharesValue: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'totalValue');
      }
    },
    organicFacebookSharesChangeValue: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changeValue');
      }
    },
    organicFacebookSharesChangePercent: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },
    organicTwitterSharesValue: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'totalValue');
      }
    },
    organicTwitterSharesChangeValue: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changeValue');
      }
    },
    organicTwitterSharesChangePercent: {
      metric: 'organicShares',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    organicFacebookLikesValue: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'totalValue');
      }
    },
    organicFacebookLikesChangeValue: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changeValue');
      }
    },
    organicFacebookLikesChangePercent: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    organicTwitterLikesValue: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'totalValue');
      }
    },
    organicTwitterLikesChangeValue: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changeValue');
      }
    },
    organicTwitterLikesChangePercent: {
      metric: 'organicLikes',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    organicFacebookCommentsValue: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'totalValue');
      }
    },
    organicFacebookCommentsChangeValue: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changeValue');
      }
    },
    organicFacebookCommentsChangePercent: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('facebook', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    organicTwitterCommentsValue: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'totalValue');
      }
    },
    organicTwitterCommentsChangeValue: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changeValue');
      }
    },
    organicTwitterCommentsChangePercent: {
      metric: 'organicComments',
      getter: function(metric) {
        return dataResolvers.getChannelValues('twitter', metric, 'changePercent');
      },
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getInsightsDataMap

function getOrganicEngagementDataMap() {
  return {
    organicEngagements: {
      metric: 'organicEngagements',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    organicEngagementsValue: {
      metric: 'organicEngagements',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    organicEngagementsChangeValue: {
      metric: 'organicEngagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    organicEngagementsChangePercent: {
      metric: 'organicEngagements',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getOrganicEngagementDataMap

function getAmplificationsDataMap() {
  return {
    organicShares: {
      metric: 'organicShares',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    organicSharesValue: {
      metric: 'organicShares',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    organicSharesChangeValue: {
      metric: 'organicShares',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    organicSharesChangePercent: {
      metric: 'organicShares',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getAmplificationsDataMap

function getOrganicLikesDataMap() {
  return {
    organicLikes: {
      metric: 'organicLikes',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    organicLikesValue: {
      metric: 'organicLikes',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    organicLikesChangeValue: {
      metric: 'organicLikes',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    organicLikesChangePercent: {
      metric: 'organicLikes',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getOrganicLikesDataMap

function getConversationsDataMap() {
  return {
    organicComments: {
      metric: 'organicComments',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },

    organicCommentsValue: {
      metric: 'organicComments',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    organicCommentsChangeValue: {
      metric: 'organicComments',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    organicCommentsChangePercent: {
      metric: 'organicComments',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getConversationsDataMap

