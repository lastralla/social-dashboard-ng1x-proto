import angular from 'angular';

angular
  .module('sdApp.charts')
  .constant('NOT_AVAIL_STR', 'n/a')
  .config(configChartsStrings);

////////// Functions //////////

/* @ngInject */
function configChartsStrings($translateProvider) {
  $translateProvider.translations('en', {
    i18n: {
      charts: {
        selectedPeriod: 'Selected Period',
        comparisonPeriod: 'Previous Period',
        change: 'Change'
      }
    }
  });
}
