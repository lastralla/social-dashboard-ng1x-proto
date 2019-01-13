import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let reportTopic = 'conversion';
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
      'conversionValueValue',
      'conversionValueChangeValue',
      'conversionValueChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'conversionValue',
        collectionKey: 'sum',
        totalValue: 'conversionValueValue',
        comparison: {
          value: 'conversionValueChangeValue',
          percent: 'conversionValueChangePercent'
        },
        callToAction: '<a class="btn special-action" href="/reporting/conversion/ads-conversion">Go to page</a>'
      }]
    }
  };
} // end getSmTable

function getGaTable() {
  return {
    type: charts.SD.Types.StackedCompareTable,
    format: charts.SD.Formats.Small,
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
        },
        callToAction: '<a class="btn special-action" href="/reporting/conversion/ga-conversions">Go to page</a>'
      }]
    }
  };
} // end getGaTable

function getBestAdsTable() {
  return {
    type: charts.SD.Types.SortableTable,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'bestAdsConversionValue',
      'bestAdsRoi',
      'bestAdsConversions',
      'bestAdsCpc',
      'bestAdsCpm'
    ],
    options: {
      i18nPrefix: reportTopic,
      columnOrder: [
        'conversionValue', 'roi', 'conversionVolume', 'cpc', 'cpm'
      ],
      sortByCollections: {
        conversionValue: 'bestAdsConversionValue',
        roi: 'bestAdsRoi',
        conversionVolume: 'bestAdsConversions',
        cpc: 'bestAdsCpc',
        cpm: 'bestAdsCpm',
      },
      metricFormatting: { // lookup value filter formatting (if any)
        conversionVolume: {
          filter: 'currency', // example passing values though filters (done in SortableTable controller)
          filterArgs: ['$', 0] // filter arguments, generated as follows: $filter('currency')(someValue, '$', 0)
        },
        roi: {
          filter: 'number',
          filterArgs: [1]
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
    conversionValueValue: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    conversionValueChangeValue: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    conversionValueChangePercent: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
}

function getTopGaDataMap() {
  return {
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
}

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getBestAdsDataMap() {
  return {
    bestAdsConversionValue: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'conversionValue', 'sortByConversionMetrics');
      }
    },
    bestAdsRoi: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'roi', 'sortByConversionMetrics');
      }
    },
    bestAdsConversions: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'conversionVolume', 'sortByConversionMetrics');
      }
    },
    bestAdsCpc: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'costPerLinkClick', 'sortByConversionMetrics');
      }
    },
    bestAdsCpm: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'cpm', 'sortByConversionMetrics');
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
