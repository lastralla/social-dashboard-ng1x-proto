import angular from 'angular';

angular
  .module('sdApp.metrics')
  .factory('metrics', metrics);

////////// Service Implementation //////////

/* @ngInject */
function metrics(METRICS_LOOKUP) {

  let service = {
    getMetricNameByDataKey: getMetricNameByDataKey
  };

  return service;

  ////////// Exposed Functions //////////

  /*
   * Returns the internal name as used in report configurations
   *
   * ex: for the following metric in METRICS_LOOKUP...
   *
   * conversions: {
   *   salesRevenue: {
   *     dataKey: 'sales_revenue',
   *     label: 'Sales Revenue'
   *   }
   * }
   *
   * getMetricNameByKey('conversions', 'sales_revenue') returns 'salesRevenue'
   * getMetricNameByKey('conversions', 'junk') returns undefined
   */
  function getMetricNameByDataKey(topic, dataKey) {
    /* jshint maxcomplexity: 5 */
    let topicMetrics = METRICS_LOOKUP[topic];

    if (!topicMetrics) {
      return;
    }

    for (let metricName in topicMetrics) {
      if (topicMetrics.hasOwnProperty(metricName)) {
        if (topicMetrics[metricName].dataKey === dataKey) {
          return metricName;
        }
      }
    }
  }
}
