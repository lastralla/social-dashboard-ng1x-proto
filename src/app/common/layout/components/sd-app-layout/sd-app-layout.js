import angular from 'angular';

require('./sd-app-layout.scss');

angular
  .module('sdApp.layout')
  .component('sdAppLayout', {
    templateUrl: require('./sd-app-layout.html')
  });
