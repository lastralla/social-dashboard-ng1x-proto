import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let reportTopic = 'referral';
let commonGetters = reporting.commonGetters;
let dataResolvers = reporting.dataResolvers;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    topSm: {
      charts: {
        sm: getSmTable()
      },

      dataMap: getTopSmDataMap()
    },

    topGa: {
      charts: {
        ga: getGaTable()
      },

      dataMap: getTopGaDataMap(),

      displayRules: getGaCheckDisplayRules()
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

function getSmTable() {
  return {
    type: charts.SD.Types.StackedCompareTable,
    format: charts.SD.Formats.Small,
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
        },
        callToAction: '<a class="btn special-action" href="/reporting/referral/ad-website-clicks">Go to page</a>'
      }]
    }
  };
} // end getSmTable

function getGaTable() {
  return {
    type: charts.SD.Types.StackedCompareTable,
    format: charts.SD.Formats.Small,
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
        },
        callToAction: '<a class="btn special-action" href="/reporting/referral/web-sessions">Go to page</a>'
      }]
    }
  };
} // end getGaTable

function getBestAdsTable() {
  return {
    type: charts.SD.Types.SortableTable,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'bestAdsImpressions',
      'bestAdsReach',
      'bestAdsConversions',
      'bestAdsCpc',
      'bestAdsCpm'
    ],
    options: {
      i18nPrefix: reportTopic,
      columnOrder: ['impressions', 'reach', 'conversionVolume', 'cpc', 'cpm'],
      sortByCollections: {
        impressions: 'bestAdsImpressions',
        reach: 'bestAdsReach',
        conversionVolume: 'bestAdsConversions',
        cpc: 'bestAdsCpc',
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
        cpc: {
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

function getTopSmDataMap() {
  return {
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
}

function getTopGaDataMap() {
  return {
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
}

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getBestAdsDataMap() {
  return {
    bestAdsImpressions: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'impressions', 'sortByReferralMetrics');
      }
    },
    bestAdsReach: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'reach', 'sortByReferralMetrics');
      }
    },
    bestAdsConversions: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'organicWebClicks', 'sortByReferralMetrics');
      }
    },
    bestAdsCpc: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'webClick', 'sortByReferralMetrics');
      }
    },
    bestAdsCpm: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'costPerEngagement', 'sortByReferralMetrics');
      }
    }
  };
} // end getBestAdsDataMap

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
