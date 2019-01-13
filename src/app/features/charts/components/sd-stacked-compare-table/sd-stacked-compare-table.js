import angular from 'angular';
import { StackedCompareTableController } from './StackedCompareTableController.js';

require('./sd-stacked-compare-table.scss');

angular
  .module('sdApp.charts')
  .component('sdStackedCompareTable', {
    bindings: {
      options: '<',
      data: '<'
    },
    controller: StackedCompareTableController,
    templateUrl: require('./sd-stacked-compare-table.html')
  });
