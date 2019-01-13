/* global FB */

import angular from 'angular';

angular
  .module('sdApp.integrations.facebook')
  .provider('facebookIntegration', facebookIntegrationProvider);

////////// Functions //////////

function facebookIntegrationProvider() {
  /* jshint validthis:true */

  let provider = this;

  /* https://developers.facebook.com/docs/javascript/reference/FB.init/v2.4 */
  let defaultParams = {
    appId: '',
    version: 'v2.4',
    status: true,
    xfbml: true
  };

  let facebookEvents = [];

  let eventBroadcastNamePrefix = 'fb';

  let callbackQueue = [];

  this.initialized = false;

  this.setDefaultParams = (params) => {
    angular.extend(defaultParams, params);
  };

  this.setEventsList = (eventArr) => {
    facebookEvents = facebookEvents.concat(eventArr);
  };

  this.setEventNamePrefix = (prefix) => {
    eventBroadcastNamePrefix = prefix;
  };

  this.$get = facebookIntegration;

  /* @ngInject */
  function facebookIntegration($rootScope, $q, helperFunctions) {

    if (!provider.initialized) {
      executeWhenInitialized(subscribeToFbEvent, this, []);
    } else {
      subscribeToFbEvent();
    }

    return {
      initialized: () => {
        return provider.initialized;
      },
      initFacebookApi: initFacebookApi,
      login: doFbLogin,
      api: callApi
    };

    ////////// Functions //////////

    function executeWhenInitialized(callback, context, args) {
      callbackQueue.push({
        callback: callback,
        context: context,
        args: args
      });
    }

    function subscribeToFbEvent() {
      facebookEvents.forEach((evt) => {
        FB.Event.subscribe(evt, (data) => {
          let eventName = eventBroadcastNamePrefix + '.' + evt;
          // if user is already signed in to facebook
          // auth.login, auth.authResponseChange, and auth.statusChange fired right away
          // if user not logged and signs in using app then these events are fired after sign in
          // upon logout
          // auth.logout, auth.authResponseChange, and auth.statusChange
          $rootScope.$broadcast(eventName, data);
        });
      });
    }

    function initFacebookApi(params) {

      window.fbAsyncInit = () => {
        /* Do Facebook init */
        angular.extend(defaultParams, params);
        FB.init(defaultParams);

        /* Call functions in callbackQueue */
        callbackQueue.forEach((obj) => {
          obj.callback.apply(obj.context, obj.args);
        });

        /* Set initialized flag to true */
        provider.initialized = true;
      };
    }

    function doFbLogin(params, callback) {
      /* Facebook API doesn't not support promises so wrap calls in promise */
      // TODO double check promisify logic something not working
      return helperFunctions.promisify((callback) => {
        FB.login((response) => {
          callback(response);
        }, params);
      });
    }

    function callApi(path, cb) {
      /* Facebook API doesn't not support promises so wrap calls in promise */
      // TODO double check promisify logic something not working
      return helperFunctions.promisify((cb) => {
        FB.api(path, (response) => {
          cb(response);
        });
      });
    }

  }

}
