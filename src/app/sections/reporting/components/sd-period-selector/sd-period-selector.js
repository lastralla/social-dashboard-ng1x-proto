import angular from 'angular';
import { PeriodSelectorController } from './PeriodSelectorController.js';

require('./sd-period-selector.scss');

angular
  .module('sdApp.reporting')
  .component('sdPeriodSelector', {
    bindings: {
      reportCtrl: '<'
    },
    controller: PeriodSelectorController,
    templateUrl: require('./sd-period-selector.html')
  });
