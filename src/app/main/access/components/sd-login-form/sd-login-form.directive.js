import angular from 'angular';
import { LoginFormController } from './LoginFormController.js';

angular
  .module('sdApp.access')
  .directive('sdLoginForm', sdLoginForm);

////////// Functions //////////

function sdLoginForm() {

  // Usage:
  // <sd-login-form></sd-login-form>
  let ddo = {
    restrict: 'E',
    bindToController: true,
    controller: LoginFormController,
    controllerAs: 'login',
    templateUrl: require('./sd-login-form.html')
  };

  return ddo;

}
