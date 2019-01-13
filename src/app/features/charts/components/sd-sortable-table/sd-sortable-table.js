import angular from 'angular';
import { SortableTableController } from './SortableTableController.js';

require('./sd-sortable-table.scss');

angular
  .module('sdApp.charts')
  .component('sdSortableTable', {
    bindings: {
      data: '<',
      options: '<'
    },
    controller: SortableTableController,
    templateUrl: require('./sd-sortable-table.html')
  });
