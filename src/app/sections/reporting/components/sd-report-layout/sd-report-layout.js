import angular from 'angular';
import { ReportLayoutController } from './ReportLayoutController.js';

require('./sd-report-layout.scss');

angular
  .module('sdApp.reporting')
  .component('sdReportLayout', {
    transclude: {
      headerSlot: '?headerSlot',
      mainSlot: 'mainSlot'
    },
    bindings: {
      reportCtrl: '<',    // Pass reference to the outer controller, for calling getReport()
      reportConfig: '<',
      reportType: '@'
    },
    controller: ReportLayoutController,
    templateUrl: require('./sd-report-layout.html')
  });
