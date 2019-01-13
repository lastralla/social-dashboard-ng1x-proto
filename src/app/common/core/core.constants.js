import angular from 'angular';

angular
  .module('sdApp.core')
  .constant('CORE_API_PATH', '/api/v1/')
  .constant('CORE_IMAGES_FOLDER_PATH', '/app/common/skin/images/')
  /*
   * Setup references to important routes
   */
  .constant('CORE_ROUTING_CONF', Object.freeze({
    homeState: 'home',
    loginState: 'login',
    errorState: 'error'
  }));
