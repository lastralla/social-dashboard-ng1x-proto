import angular from 'angular';

import { communityMetrics } from './communityMetrics.js';
import { conversionMetrics } from './conversionMetrics.js';
import { engagementMetrics } from './engagementMetrics.js';
import { referralMetrics } from './referralMetrics.js';

angular
  .module('sdApp.metrics', [])
  .constant('METRICS_LOOKUP', getMetricConfig())
  .config(configMetricsStrings);

////////// Functions //////////

/* @ngInject */
function configMetricsStrings($translateProvider) {
  $translateProvider.translations('en', getEnMetricLabels());
}

function getEnMetricLabels() {
  return {
    i18n: {
      metrics: getMetricConfig()
    }
  };
}

/* Returns metric mappings between frontend and backend in a this way...
 *
 *   {
 *     someMetric: {
 *       dataKey: 'SomeMetricBE',      // as it's called in the backend
 *       label: 'Some Metric'          // label in UI
 *     },
 *     anotherMetric: {
 *       dataKey: 'another_metric_BE', // as it's called in the backend
 *       label: 'Another Metric'       // label in UI
 *     }
 *   }
 */
function getMetricConfig() {
  return {

    /* Fake topic */
    sample: getFakeMetrics(),

    /* ***** Real metrics ***** */

    community: communityMetrics,
    conversion: conversionMetrics,
    engagement: engagementMetrics,
    referral: referralMetrics
  };
}

function getFakeMetrics() {
  return {
    'sentiment': {
      'dataKey': 'sentiment',
      'label': 'Sentiment'
    },
    'salesRevenue': {
      'dataKey': 'salesRevenue',
      'label': 'Sales Revenue'
    },
    'gaAdConversion': {
      'dataKey': 'gaAdConversion',
      'label': 'Ad Conversions'
    },
    'sales': {
      'dataKey': 'sales',
      'label': 'Sales'
    },
    'roi': {
      'dataKey': 'roi',
      'label': 'ROI'
    },
    'conversions': {
      'dataKey': 'conversions',
      'label': 'Conversions'
    },
    'cpm': {
      'dataKey': 'cpm',
      'label': 'CPM'
    },
    'cpc': {
      'dataKey': 'cpc',
      'label': 'CPC'
    },
    'bestAds': {
      'dataKey': 'bestAds',
      'label': 'Best Ads'
    }
  };
} // getFakeMetrics
