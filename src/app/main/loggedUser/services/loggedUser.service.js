import angular from 'angular';

angular
  .module('sdApp.loggedUser')
  .service('loggedUser', loggedUser);

////////// Functions //////////

let currentBrandId = null;

/* @ngInject */
function loggedUser($rootScope, $http, localStorageService, CORE_API_PATH) {
  /* jshint validthis: true */
  let service = this;

  service.getCurrentUser = getCurrentUser;
  service.getLoggedUser = getLoggedUser;
  service.clearLoggedUser = clearLoggedUser;
  service.setCurrentBrandId = setCurrentBrandId;
  service.getCurrentBrandId = getCurrentBrandId;

  let loggedUserStorageKey = 'loggedUser';

  $rootScope.$on('auth.unauthorized', onAuthUnauthorizedEvent);

  ////////// Public Functions //////////

  function getCurrentUser() { // TODO clear naming confusion between getCurrentUser and getLoggedUser
    return $http.get(CORE_API_PATH + 'user/currentuser/')
      .then((response) => {
        localStorageService.set(loggedUserStorageKey, response.data);

        return response;
      });
  }

  function getLoggedUser() {
    let loggedUser = localStorageService.get(loggedUserStorageKey);

    if (!loggedUser) {
      $rootScope.$emit('loggedUser.noToken');

      return null;
    }

    return loggedUser;
  }

  function clearLoggedUser() {
    localStorageService.remove(loggedUserStorageKey);
    currentBrandId = null;
  }

  function setCurrentBrandId(id) {
    let loggedUser = localStorageService.get(loggedUserStorageKey);
    loggedUser.activeBrand = id;
    localStorageService.set(loggedUserStorageKey, loggedUser);

    let newBrand = loggedUser.brands[loggedUser.activeBrand];
    $rootScope.$emit('loggedUser.newActiveBrand', newBrand);
  }

  function getCurrentBrandId() {
    return localStorageService.get(loggedUserStorageKey).activeBrand;
  }

  ////////// Private Functions //////////

  function onAuthUnauthorizedEvent(event) {
    clearLoggedUser();
  }
}
