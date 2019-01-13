import angular from 'angular';

angular
  .module('sdApp.core.exception')
  .factory('exception', exception);

////////// Functions //////////

/* @ngInject */
function exception(logger) {
  let service = {
    catcher: catcher
  };

  return service;

  ////////// Functions //////////

  function catcher(message) {
    return function(reason) {
      logger.error(message, reason);
    };
  }
}
