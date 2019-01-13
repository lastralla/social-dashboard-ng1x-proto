import angular from 'angular';
import { CompareTableController } from './CompareTableController.js';

require('./sd-compare-table.scss');

angular
  .module('sdApp.charts')
  .component('sdCompareTable', {
    bindings: {
      options: '<',
      data: '<'
    },
    controller: CompareTableController,
    templateUrl: require('./sd-compare-table.html')
  });
