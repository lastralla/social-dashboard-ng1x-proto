import angular from 'angular';

angular
  .module('sdApp.utils.debounce')
  .factory('debounce', debounce);

////////// Functions //////////

/* @ngInject */
function debounce($timeout, $q) {
  return (func, wait, immediate) => {
    let timeout;
    let deferred = $q.defer();

    return function() {
      let context = this;
      let args = arguments;

      let later = () => {
        timeout = null;

        if (!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };

      let callNow = immediate && !timeout;

      if (timeout) {
        $timeout.cancel(timeout);
      }

      timeout = $timeout(later, wait);

      if (callNow) {
        deferred.resolve(func.apply(context, args));
        deferred = $q.defer();
      }

      return deferred.promise;
    };
  };
}
