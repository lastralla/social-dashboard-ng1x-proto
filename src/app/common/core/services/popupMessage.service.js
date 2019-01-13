import angular from 'angular';

/*
 * A service to wraps angular toastr and use i18n strings
 *
 */
angular
  .module('sdApp.core')
  .factory('popupMessage', popupMessage);

////////// Functions //////////

/* @ngInject */
function popupMessage($filter, toastr) {
  let service = {
    success: success,
    error: error
  };

  return service;

  ////////// Functions //////////

  function success(msg) {
    toastr.success(msg);
  }

  function error(msgKey) {
    let translatedStr = $filter('translate')(msgKey);
    toastr.error(translatedStr);
  }
}
