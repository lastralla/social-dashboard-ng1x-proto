import { reporting } from '../../logic/reporting.js';
import { charts } from '../../../../features/charts/logic/charts.js';

let reportTopic = 'sample';
let dataResolvers = reporting.dataResolvers;

let overviewConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* ---------- Visualisations for Overview --------------- */
    /* ------------------------------------------------------ */
    main: {
      charts: {
        /* ----- Bar Chart ----- */
        chart1main: getMainChart1Config()
      },

      /* ----- Data Mappings for 'main' visualisation ----- */
      dataMap: getMainDataMap()
    }
  }
};

export { overviewConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

/*
 * Returns the part of the report configuration that configures a chart
 */
function getMainChart1Config() {
  return {
    type: charts.SD.Types.SortableTable,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'bestAdsSales',
      'bestAdsRoi',
      'bestAdsConversions',
      'bestAdsCpc',
      'bestAdsCpm'
    ],
    options: {
      i18nPrefix: reportTopic,
      columnOrder: ['sales', 'roi', 'conversions', 'cpc', 'cpm'],
      sortByCollections: { // maps active state (sales|roi|etc) to the collection to use in model
        sales: 'bestAdsSales',
        roi: 'bestAdsRoi',
        conversions: 'bestAdsConversions',
        cpc: 'bestAdsCpc',
        cpm: 'bestAdsCpm',
      },
      metricFormatting: { // lookup value filter formatting (if any)
        sales: {
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
} // end getMainChart1Config

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

function getMainDataMap() {
  return {
    bestAdsSales: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'sales', 'sortByConversion');
      }
    },
    bestAdsRoi: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'roi', 'sortByConversion');
      }
    },
    bestAdsConversions: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'conversions', 'sortByConversion');
      }
    },
    bestAdsCpc: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'cpc', 'sortByConversion');
      }
    },
    bestAdsCpm: {
      metric: 'bestAds',
      getter: function(metric) {
        return dataResolvers.getOrderedCollection(metric, 'ads', 'cpm', 'sortByConversion');
      }
    }
  };
} // end getMainDataMap

