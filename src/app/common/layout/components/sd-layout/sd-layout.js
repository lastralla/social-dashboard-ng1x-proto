import angular from 'angular';

require('./sd-layout.scss');

angular
  .module('sdApp.layout')
  .component('sdLayout', {
    bindings: {
      name: '<'
    },
    templateUrl: require('./sd-layout.html')
  });

