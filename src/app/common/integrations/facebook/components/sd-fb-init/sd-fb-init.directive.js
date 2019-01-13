import angular from 'angular';

angular
  .module('sdApp.integrations.facebook')

  /**
   * @ngdoc directive
   * @name sdFbInit
   * @restrict E
   *
   * @description
   * Facebook initialization directive.
   *
   * @example
   *   <sd-fb-init app-id="123456"></sd-fb-init>
   */
  .directive('sdFbInit', sdFbInit);

////////// Functions //////////

/* @ngInject */
function sdFbInit($location, facebookIntegration) {
  let template = '<div id="fb-root"></div>';

  let script = document.createElement('script');
  script.src = '//connect.facebook.net/en_US/sdk.js'; // TODO localize sdk version
  script.id = 'facebook-jssdk';
  script.async = true;

  return {
    restrict: 'E',
    template: template,

    scope: {
      appId: '@',
      params: '='
    },

    link: (scope, element, attrs) => {
      if (!facebookIntegration.initialized()) {
        let params = scope.params || {};

        document.body.appendChild(script);

        angular.extend(params, {
          appId: scope.appId
        });
        facebookIntegration.initFacebookApi(params);
      }
    }
  };
}
