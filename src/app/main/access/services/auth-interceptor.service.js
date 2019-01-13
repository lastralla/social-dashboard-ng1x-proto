import angular from 'angular';

angular
  .module('sdApp.access')
  .factory('authInterceptor', authInterceptor);

////////// Functions //////////

/* @ngInject */
function authInterceptor($injector) {

  let service = {
    request: request,
    responseError: responseError
  };

  return service;

  ////////// Functions //////////

  function request(req) {
    let $auth = $injector.get('$auth');
    let isAuthenticated = $auth.isAuthenticated();

    if (isAuthenticated) {
      req.headers['X-Auth-Token'] = $auth.getToken();
    }

    let $cookies = $injector.get('$cookies');
    let csrfToken = $cookies.get('PLAY_CSRF_TOKEN');

    // TODO is this being used by the backend or not?
    if (csrfToken) {
      // Play looks for a token with the name Csrf-Token
      // https://www.playframework.com/documentation/2.4.x/ScalaCsrf
      req.headers['Csrf-Token'] = csrfToken;
    }

    return req;
  }

  function responseError(response) {
    let $q = $injector.get('$q');
    let $auth = $injector.get('$auth');
    let access = $injector.get('access');

    return $q.reject(response);
  }

}
