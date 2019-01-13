import angular from 'angular';
import { SocialLoginController } from './SocialLoginController.js';

require('./sd-social-login.scss');

angular
  .module('sdApp.access')
  .directive('sdSocialLogin', sdSocialLogin);

////////// Functions //////////

function sdSocialLogin() {

  // Usage:
  // <sd-social-login></sd-social-login>
  let ddo = {
    restrict: 'E',
    controller: SocialLoginController,
    controllerAs: 'sl',
    templateUrl: require('./sd-social-login.html')
  };

  return ddo;

}
