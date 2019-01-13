import angular from 'angular';

angular
  .module('sdApp.layout', [
    require('angular-ui-router')
  ])
  .run(bindStateChangeLayoutSwitcher);

////////// Functions //////////

/* @ngInject */
function bindStateChangeLayoutSwitcher($rootScope) {
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    let layout = toState.layout || 'app-layout'; // TODO move default to layout module

    $rootScope.currentLayout = layout; // TODO move to service
  });
}
