import angular from 'angular';

import { ChartController } from './ChartController.js';

require('./sd-chart.scss');

angular
  .module('sdApp.charts')
  .component('sdChart', {
    bindings: {
      title: '@',
      size: '@',
      model: '<',
      metric: '@'
    },
    controller: ChartController,
    templateUrl: require('./sd-chart.html')
  });
