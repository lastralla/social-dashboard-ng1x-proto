import angular from 'angular';

require('../../common/core/_loader.js');
require('../../common/core/services/_loader.js');
require('../../common/navigation-auth/_loader.js');
require('../loggedUser/_loader.js');

require('./access.scss');

angular
  .module('sdApp.access', [
    'sdApp.core',
    'sdApp.navigationAuth',
    'sdApp.loggedUser'
  ])
  .run(bindAccessEventListeners);

////////// Functions //////////

/* @ngInject */
function bindAccessEventListeners($rootScope, $state, $location, ACCESS_ROUTING_CONF) {

  $rootScope.$on('access.unauthorized', onAccessUnauthorizedEvent);
  $rootScope.$on('access.authorized', onAccessAuthorizedEvent);

  ////////// Functions //////////

  function onAccessUnauthorizedEvent() {
    $state.go(ACCESS_ROUTING_CONF.loginState);
  }

  function onAccessAuthorizedEvent(event, message) {
    $location.path(ACCESS_ROUTING_CONF.homeRoute);
  }
}
