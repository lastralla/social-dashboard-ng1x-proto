import angular from 'angular';
import { ActiveBrandSelectorController } from './ActiveBrandSelectorController.js';

require('./sd-active-brand-selector.scss');

angular
  .module('sdApp.loggedUser')
  .component('sdActiveBrandSelector', {
    controller: ActiveBrandSelectorController,
    templateUrl: require('./sd-active-brand-selector.html')
  });
