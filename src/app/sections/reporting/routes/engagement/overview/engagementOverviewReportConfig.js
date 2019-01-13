import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let reportTopic = 'engagement';
let commonGetters = reporting.commonGetters;
let dataResolvers = reporting.dataResolvers;
let dataFormatters = reporting.dataFormatters;

let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    top: {
      charts: {
        table: getTableConfig()
      },

      dataMap: getTopDataMap()
    },

    bestAds: {
      charts: {
        table: getBestAdsTable()
      },

      dataMap: getBestAdsDataMap()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getTableConfig() {
  return {
    type: charts.SD.Types.StackedCompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'engagementsValue',
      'engagementsChangeValue',
      'engagementsChangePercent',

      'organicEngagementsValue',
      'organicEngagementsChangeValue',
      'organicEngagementsChangePercent'
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
        },
        callToAction: '<a class="btn special-action" href="/reporting/engagement/ads-engagement">Go to page</a>'
      }, {
        metricName: 'organicEngagements',
        collectionKey: 'sum',
        totalValue: 'organicEngagementsValue',
        comparison: {
          value: 'organicEngagementsChangeValue',
          percent: 'organicEngagementsChangePercent'
        },
        callToAction: '<a class="btn special-action" href="/reporting/engagement/organic-engagement">Go to page</a>'
      }]
    }
  };
} // end getTableConfig

function getBestAdsTable() {
  return {
    type: charts.SD.Types.SortableTable,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'bestAdsImpressions',
      'bestAdsReach',
      'bestAdsEngagements',
      'bestAdsCpe'
      // ,
      // 'bestAdsCpm'
    ],
    options: {
      i18nPrefix: reportTopic,
      columnOrder: ['impressions', 'reach', 'engagements', 'costPerEngagement'],
      sortByCollections: {
        impressions: 'bestAdsImpressions',
        reach: 'bestAdsReach',
        engagements: 'bestAdsEngagements',
        costPerEngagement: 'bestAdsCpe'
        // ,
        // cpm: 'bestAdsCpm'
      },
      metricFormatting: { // lookup value filter formatting (if any)
        impressions: {
          filter: 'number',
          filterArgs: [0]
        },
        reach: {
          filter: 'number',
          filterArgs: [0]
        },
        bestAdsCpe: {
          filter: 'currency',
          filterArgs: ['$', 2]
        // },
        // cpm: {
        //   filter: 'currency',
        //   filterArgs: ['$', 2]
        }
      }
    }
  };
} // end getBestAdsTable


/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

function getTopDataMap() {
  return {
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
} // end getTopDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getBestAdsDataMap() {
  let sortBy = 'sortByEngagementMetrics';

  return {
    bestAdsImpressions: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'impressions', sortBy);
      }
    },
    bestAdsReach: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'reach', sortBy);
      }
    },
    bestAdsEngagements: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'engagements', sortBy);
      }
    },
    bestAdsCpe: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'costPerEngagement', sortBy);
      }
    // },
    // bestAdsCpm: {
    //   metric: 'bestAds',
    //   getter: function(metric) {
    //     return dataResolvers.getOrderedCollection(metric, 'ads', 'cpm', sortBy);
      // }
    }
  };
} // end getBestAdsDataMap
