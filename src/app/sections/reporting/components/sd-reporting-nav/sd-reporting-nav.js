import angular from 'angular';

require('./sd-reporting-nav.scss');

angular
  .module('sdApp.reporting')
  .component('sdReportingNav', {
    templateUrl: require('./sd-reporting-nav.html')
  });
