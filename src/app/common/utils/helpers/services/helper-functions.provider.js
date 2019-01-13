import angular from 'angular';

angular
  .module('sdApp.utils.helpers')
  .provider('helperFunctions', helperFunctionsProvider);

////////// Functions //////////

function helperFunctionsProvider() {
  let injector = angular.injector(['ng']);

  let $rootScope = {};
  let $q = {};

  /* Build the lookup object (Links names with implementations below) */
  let helperFunctionsObj = {
    promisify: promisify
  };

  /*
   * Make helper functions available to config and run stages
   * e.g. so can be called as helperFunctionsProvider.myFunc()
   * or as helperFunctions.myFunc()
   */

  let returnedFunctions = helperFunctionsObj;

  returnedFunctions.$get = () => {
    return helperFunctionsObj;
  };

  return returnedFunctions;

  ////////// Functions //////////

  // TODO is promisify used?
  function promisify(func) {
    let deferred = $q.defer();

    func((response) => {
      if (response && response.error) {
        deferred.reject(response);
      } else {
        deferred.resolve(response);
      }

      $rootScope.$apply();
    });

    return deferred.promise;
  }
}
