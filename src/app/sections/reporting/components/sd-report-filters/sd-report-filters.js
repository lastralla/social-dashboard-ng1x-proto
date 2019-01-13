import angular from 'angular';
import { ReportFiltersController } from './ReportFiltersController.js';

require('./sd-report-filters.scss');

angular
  .module('sdApp.reporting')
  .component('sdReportFilters', {
    transclude: true,
    bindings: {
      config: '<'
    },
    controller: ReportFiltersController,
    templateUrl: require('./sd-report-filters.html')
  });
