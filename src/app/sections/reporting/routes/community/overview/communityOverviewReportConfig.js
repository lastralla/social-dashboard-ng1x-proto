import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let reportTopic = 'community';
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
        },
        callToAction: '<a class="btn special-action" href="/reporting/community/ads-community">Go to page</a>'
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
      'bestAdsFans',
      'bestAdsCpf',
      'bestAdsCpm'
    ],
    options: {
      i18nPrefix: reportTopic,
      columnOrder: ['impressions', 'reach', 'fans', 'costPerFan', 'cpm'],
      sortByCollections: {
        impressions: 'bestAdsImpressions',
        reach: 'bestAdsReach',
        fans: 'bestAdsFans',
        costPerFan: 'bestAdsCpf',
        cpm: 'bestAdsCpm',
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
        costPerFan: {
          filter: 'currency',
          filterArgs: ['$', 2]
        },
        cpm: {
          filter: 'currency',
          filterArgs: ['$', 2]
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
} // end getTopDataMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getBestAdsDataMap() {
  let sortBy = 'sortByCommunityMetrics';

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
    bestAdsFans: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'fans', sortBy);
      }
    },
    bestAdsCpf: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'costPerFan', sortBy);
      }
    },
    bestAdsCpm: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'cpm', sortBy);
      }
    }
  };
} // end getBestAdsDataMap
