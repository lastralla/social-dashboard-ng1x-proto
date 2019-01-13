import angular from 'angular';

require('./sd-access-layout.scss');

angular
  .module('sdApp.layout')
  .component('sdAccessLayout', {
    templateUrl: require('./sd-access-layout.html')
  });
