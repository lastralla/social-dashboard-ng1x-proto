import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';

/**
 * This modules keeps track of where the user is within the application and
 * validates that the user has proper permissions.
 */
angular
  .module('sdApp.navigationAuth', [
    uiRouter,
    satellizer
  ]);
