import angular from 'angular';
import { RegisterFormController } from './RegisterFormController.js';

angular
  .module('sdApp.access')
  .directive('sdRegisterForm', sdRegisterForm);

////////// Functions //////////

/* @ngInject */
function sdRegisterForm() {

  // Usage:
  // <sd-register-form></sd-register-form>
  let ddo = {
    restrict: 'E',
    controller: RegisterFormController,
    controllerAs: 'reg',
    templateUrl: require('./sd-register-form.html')
  };

  return ddo;

}
