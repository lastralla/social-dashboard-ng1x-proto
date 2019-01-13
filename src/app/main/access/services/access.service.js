import angular from 'angular';

angular
  .module('sdApp.access')
  .service('access', access);

////////// Functions //////////

/* @ngInject */
function access($rootScope, $auth, loggedUser, logger) {
  /* jshint validthis: true */
  let service = this;

  service.error = undefined;
  service.register = register;
  service.login = login;
  service.logout = logout;

  /* Ensure there's a user */
  if (!loggedUser.getLoggedUser() || !$auth.isAuthenticated()) {
    logout();
  }

  $rootScope.$on('loggedUser.noToken', logout);

  ////////// Public Functions //////////

  function register(tokenPromise) {
    tokenPromise
      .then((response) => {
        $auth.setToken(response.data.token);
      })
      .then(loggedUser.getCurrentUser) // TODO should this return original response?
      .then((response) => {
        // TODO remove text from service
        let title = 'Account Created!';
        let message = 'Welcome to Social Dashboard ' + response.data.firstName;

        logger.success(message, '', title);
      })
      .then(announceUser)
      .catch(catchAuthError);
  }

  function login(tokenPromise) {
    tokenPromise
      .then(loggedUser.getCurrentUser) // TODO should this return original response?
      .then((response) => {
        let message = 'Welcome ' + response.data.firstName;

        logger.success(message);

        return response;
      })
      .then(announceUser)
      .catch(catchAuthError);

    // Note: Since the access token returned from tokenPromise does not contain the
    // logged-in user's info we need to make a separate service call to retrieve it
    // before announcing the user. Ideally (in the future) the token should contain
    // the user info and not require the extra service call.
  }

  function logout() {
    $auth.logout()
      .then(() => {
        $rootScope.$emit('access.unauthorized');
      });
  }

  ////////// Private Functions //////////

  function announceUser(response) {
    let activeUser = response.data;
    $rootScope.$emit('access.authorized', activeUser);
  }

  function catchAuthError(response) {
    let errorKey;

    if (response.status === 401 || response.status === 422) {
      errorKey = response.data;
    } else if (response.status === 500) {
      errorKey = 'server.error';
    } else {
      errorKey = 'general.error';
    }

    service.error = {
      message: errorKey
    };
  }
}
