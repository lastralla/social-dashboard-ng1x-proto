import angular from 'angular';

angular
  .module('sdApp.integrations.facebook')

  /**
   * @ngdoc directive
   * @name sdFbLogin
   * @restrict E
   *
   * @description
   * Shows facebook login button.
   *
   * @example
   *   <sd-fb-login size="large" auto-logout="false"></sd-fb-login>
   */
  .directive('sdFbLogin', () => {
    let template =
      '<div class="fb-login-button" ' +
      'data-max-rows="1" ' +
      'data-size="{{size||\'medium\'}}" ' +
      'data-show-faces="{{!!showFaces}}" ' +
      'data-auto-logout-link="{{!!autoLogout}}" ' +
      'data-scope="{{scope || \'public_profile\'}}"' +
      '></div>';

    return {
      restrict: 'E',
      scope: {
        'autoLogout': '@',
        'size': '@',
        'showFaces': '@',
        'scope': '@'
      },
      template: template
    };
  });
