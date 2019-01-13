import angular from 'angular';
import { AppMainNavController } from './AppMainNavController.js';

require('./sd-app-main-nav.scss');

angular
  .module('sdApp.layout')
  .directive('sdAppMainNav', sdAppMainNav);

////////// Functions //////////

/* @ngInject */
function sdAppMainNav(routerHelper) {

  // Usage:
  // <sd-app-main-nav></sd-app-main-nav>
  let ddo = {
    restrict: 'E',
    controller: AppMainNavController,
    controllerAs: '$ctrl',
    templateUrl: require('./sd-app-main-nav.html')
  };

  return ddo;

}
