import angular from 'angular';

angular
  .module('sdApp.navigationAuth')
  .constant('NAV_AUTH_DEFAULT_CONTEXT', 'public')
  .value('navigationAuthContexts', {})
  .run(addPublicNavContext)
  .run(addAuthenticatedNavContext)
  .run(addRegistrationNavContext)
  .run(addAnyNavContext)
  .run(bindStateChangeListener);

////////// Functions //////////

/* @ngInject */
function addPublicNavContext($state, $auth, navigationAuthContexts, CORE_ROUTING_CONF) {

  navigationAuthContexts.public = {
    validate: () => {

      let contextValidation = {
        passes: true
      };

      if ($auth.isAuthenticated()) {
        contextValidation = {
          passes: false, /* if user is authenticated then it's not "public" */
          errorHandler: () => {
            $state.go(CORE_ROUTING_CONF.homeState);
          }
        };
      }

      return contextValidation;
    }
  };
}

/* @ngInject */
function addAuthenticatedNavContext($state, $auth,
    navigationAuthContexts, CORE_ROUTING_CONF) {

  navigationAuthContexts.authenticated = {
    validate: () => {

      let contextValidation = {
        passes: true
      };

      let errorMessage = 'You must be logged in.'; // TODO put in i18n config

      if (!$auth.isAuthenticated()) {
        contextValidation = {
          passes: false,
          message: errorMessage,
          errorHandler: () => {
            $state.go(CORE_ROUTING_CONF.loginState, {
              message: errorMessage
            });
          }
        };
      }

      return contextValidation;
    }
  };
}

/* @ngInject */
function addRegistrationNavContext($state, $auth,
    navigationAuthContexts, CORE_ROUTING_CONF) {

  navigationAuthContexts.registration = {
    validate: () => {

      let contextValidation = {
        passes: true
      };

      if ($auth.isAuthenticated()) {
        contextValidation = {
          passes: false,
          errorHandler: () => {
            $state.go(CORE_ROUTING_CONF.errorState);
          }
        };
      }

      return contextValidation;
    }
  };
}

/* @ngInject */
function addAnyNavContext(navigationAuthContexts) {

  /* "any" navContext lets everyone go to state */
  navigationAuthContexts.any = {
    validate: () => {
      return {
        passes: true
      };
    }
  };
}

/* @ngInject */
function bindStateChangeListener($rootScope, navigationAuth) {

  $rootScope.$on('$stateChangeStart', (evt, toState) => {
    let stateAuth = navigationAuth.checkStateAuth(toState);

    if (stateAuth.passes) {
      navigationAuth.setNavAuthContext(toState);
    } else {
      evt.preventDefault();
      stateAuth.errorHandler();
    }
  });

}
