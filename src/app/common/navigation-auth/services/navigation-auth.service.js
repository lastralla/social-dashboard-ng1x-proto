import angular from 'angular';

angular
  .module('sdApp.navigationAuth')
  .factory('navigationAuth', navigationAuth);

////////// Functions //////////

/* @ngInject */
function navigationAuth($state, navigationAuthContexts,
    NAV_AUTH_DEFAULT_CONTEXT, CORE_ROUTING_CONF) {

  let currentAuthContexts = [NAV_AUTH_DEFAULT_CONTEXT];

  let service = {
    setNavAuthContext: setNavAuthContext,
    getNavAuthContext: getNavAuthContext,
    checkStateAuth: checkStateAuth
  };

  return service;

  ////////// Service Implementations //////////

  function setNavAuthContext(uiState) {
    let navContextsArr = uiState.data.navContext;

    if (navContextsArr) {
      currentAuthContexts = navContextsArr;
    }
  }

  function getNavAuthContext() {
    return currentAuthContexts;
  }

  /**
   * Checks that the user can go to a state.
   */
  function checkStateAuth(uiState) {

    /* Make sure the router state contains navContext data */
    let hasAuthContextData = checkHasAuthContextData(uiState);
    if (!hasAuthContextData.passes) {
      /* No data, send back error object */
      return hasAuthContextData;
    }

    /* Make sure navContext(s) exist */
    let navContextExists = checkNavContextExists(uiState);
    if (!navContextExists.passes) {
      /* State has unknown nav contect, send back error object */
      return navContextExists;
    }

    /* Make sure each navContext's pre-condition is met */
    let stateConditionsValidate = checkStateConditionsValidate(uiState);
    if (!stateConditionsValidate.passes) {
      /* At least one condition does not pass, send back error object */
      return stateConditionsValidate;
    }

    /* All conditions pass, good to navigate to state, send truthy object */
    return {
      passes: true
    };

    ////////// Functions //////////

    function checkHasAuthContextData(uiState) {
      let stateData = uiState.data || {};
      let noAuthErrMsg = 'state "' + uiState.name + '" has no auth context data';

      if (!stateData.navContext) {

        /* Send error object */
        return {
          passes: false,
          message: noAuthErrMsg,
          errorHandler: () => {
            $state.go(CORE_ROUTING_CONF.errorState, {
              message: noAuthErrMsg
            });
          }
        };
      }

      return {
        passes: true
      };
    }

    function checkNavContextExists(uiState) {
      let stateData = uiState.data;
      let navigationContexts = getNavigationContexts(stateData.navContext);
      let unknownCtxErrMsg = 'state "' + uiState.name + '" contains unknown context';

      if (!navigationContexts) {

        /* Send error object */
        return {
          passes: false,
          message: unknownCtxErrMsg,
          errorHandler: () => {
            $state.go(CORE_ROUTING_CONF.errorState, {
              message: unknownCtxErrMsg
            });
          }
        };
      }

      return {
        passes: true
      };
    }

    function checkStateConditionsValidate(uiState) {
      let stateData = uiState.data;
      let navigationContexts = getNavigationContexts(stateData.navContext);
      let stateAuth = validateStateAuthorized(navigationContexts);

      if (!stateAuth.passes) {

        /* Send error object from validateStateAuthorized */
        return stateAuth;
      }

      return {
        passes: true
      };
    }

  }

  ////////// Functions //////////

  function getNavigationContexts(navContextArr) {
    let contextsArr = [];
    let hasAtLeastOneUnknownContext;

    navContextArr.forEach((navContext) => {
      if (navigationAuthContexts[navContext]) {
        contextsArr.push(navigationAuthContexts[navContext]);
      } else {
        hasAtLeastOneUnknownContext = true;
      }
    });

    if (hasAtLeastOneUnknownContext) {
      return;
    }

    return contextsArr;
  }

  function validateStateAuthorized(navContextArr) {

    /* Set a default pass condition */
    let stateValidation = {
      passes: true
    };

    /* For each context, call its validate method to check if it's allowed */
    navContextArr.forEach((context) => {
      let contextValidation = context.validate();

      /* Check for failed authorization condition */
      if (!contextValidation.passes) {
        // This loop makes it so only the last error object is kept.
        // For rare (i.e. never) cases where there are multiple errors it means
        // the user will need to meet each condition separately.
        stateValidation = contextValidation;
      }
    });

    return stateValidation;
  }

}
