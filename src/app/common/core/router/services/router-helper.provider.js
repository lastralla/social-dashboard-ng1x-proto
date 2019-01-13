import angular from 'angular';

angular
  .module('sdApp.core.router')
  .provider('routerHelper', routerHelperProvider);

////////// Functions //////////

/* @ngInject */
function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
  /* jshint validthis:true */

  let config = {
    defaultPath: '/',
    resolveAlways: {}
  };

  $locationProvider.html5Mode(true);

  this.configure = (cfg) => {
    angular.extend(config, cfg);
  };

  this.$get = RouterHelper;

  ////////// Functions //////////

  /* @ngInject */
  function RouterHelper($location, $rootScope, $state) {
    let handlingStateChangeError = false;
    let hasOtherwise = false;

    let stateCounts = {
      errors: 0,
      changes: 0
    };

    let service = {
      configureStates: configureStates,
      getStates: getStates,
      stateCounts: stateCounts
    };

    bindRoutingErrorsHandler();

    return service;

    ////////// Public Functions //////////

    function configureStates(states, otherwisePath) {
      states.forEach((state) => {
        state.config.resolve =
          angular.extend(state.config.resolve || {}, config.resolveAlways);
        $stateProvider.state(state.state, state.config);
      });
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    function getStates() {
      return $state.get();
    }

    ////////// Functions //////////

    function bindRoutingErrorsHandler() {
      /* jshint maxparams:6 */
      $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
          if (handlingStateChangeError) {
            return;
          }

          stateCounts.errors++;
          handlingStateChangeError = true;

          $location.path(config.defaultPath);

          // TODO reenable logging only in a debug state
          // let destination = defineDestination();
          // let msg = defineMsg();
          // logger.warning(msg, [toState]);

          ////////// Functions //////////

          // function defineDestination() {
          //   return (toState && (toState.title || toState.name ||
          //     toState.loadedTemplateUrl)) || 'unknown target';
          // }

          // function defineMsg() {
          //   return 'Error routing to ' + destination + '. ' +
          //     (error.data || '') + '. <br/>' + (error.statusText || '') +
          //     ': ' + (error.status || '');
          // }
        }
      );
    }
  }
}
