import angular from 'angular';

angular
  .module('sdApp.brands')
  .factory('brands', brands);

////////// Functions //////////

/* @ngInject */
function brands($http, CORE_API_PATH) {
  return {
    getActiveBrand: () => {
      return $http.get(CORE_API_PATH + 'brands/activebrand/');
    },
    getBrands: () => {
      return $http.get(CORE_API_PATH + 'brands/list/');
    }
  };
}
