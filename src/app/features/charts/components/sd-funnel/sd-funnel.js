import angular from 'angular';
import { FunnelController } from './FunnelController.js';

require('./sd-funnel.scss');

angular
  .module('sdApp.charts')
  .component('sdFunnel', {
    bindings: {
      data: '<',
      options: '<'
    },
    controller: FunnelController,
    templateUrl: require('./sd-funnel.html')
  });
