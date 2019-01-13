import angular from 'angular';
import { ReportFilterController } from './ReportFilterController.js';

require('./sd-report-filter.scss');

angular
  .module('sdApp.reporting')
  .component('sdReportFilter', {
    transclude: true,
    bindings: {
      name: '<',
      filter: '='
    },
    controller: ReportFilterController,
    templateUrl: require('./sd-report-filter.html')
  });

