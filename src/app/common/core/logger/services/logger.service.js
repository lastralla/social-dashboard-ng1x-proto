import angular from 'angular';

angular
  .module('sdApp.core.logger')
  .factory('logger', logger);

////////// Functions //////////

/* @ngInject */
function logger($log) {

  let service = {
    error: error,
    info: info,
    success: success,
    warning: warning,

    log: $log.log
  };

  return service;

  ////////// Functions //////////

  function error(message, data, title) {
    $log.error('Error: ' + message, data);
  }

  function info(message, data, title) {
    $log.info('Info: ' + message, data);
  }

  function success(message, data, title) {
    $log.info('Success: ' + message, data);
  }

  function warning(message, data, title) {
    $log.warn('Warning: ' + message, data);
  }

}
