import angular from 'angular';

require('./sd-change-direction.scss');

angular
  .module('sdApp.charts')
  .component('sdChangeDirection', {
    bindings: {
      value: '<',
      isBetter: '<',
      isWorse: '<',
      unit: '<'
    },
    templateUrl: require('./sd-change-direction.html')
  });
