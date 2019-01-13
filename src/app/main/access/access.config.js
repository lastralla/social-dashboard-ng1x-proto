import angular from 'angular';

import { server } from '../../../../environment.js';
import { apikeys } from '../../../../environment.js';

angular
  .module('sdApp.access')
  .config(configAuthInterceptorProvider)
  .config(configAuthProvider)
  .config(configAccessStrings);

////////// Functions //////////

/* @ngInject */
function configAuthInterceptorProvider($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}

/* @ngInject */
function configAuthProvider($authProvider, ACCESS_ROUTING_CONF, ACCESS_AUTH_URLS) {
  /* Using our own custom interceptor */
  $authProvider.httpInterceptor = false;

  /* Login */
  $authProvider.loginRoute = ACCESS_ROUTING_CONF.loginRoute;
  $authProvider.loginUrl = ACCESS_AUTH_URLS.login;
  $authProvider.loginRedirect = ACCESS_ROUTING_CONF.homeRoute;

  /* Logout */
  $authProvider.logoutRedirect = ACCESS_ROUTING_CONF.loginRoute;

  /* Register */
  $authProvider.signupRoute = ACCESS_ROUTING_CONF.registerRoute;
  $authProvider.signupUrl = ACCESS_AUTH_URLS.register;
  $authProvider.signupRedirect = ACCESS_ROUTING_CONF.homeRoute;

  let serverUri = server.protocol + server.hostname + (server.port ? `:${server.port}` : ''); /* jscs:disable maximumLineLength */

  /* Facebook Authentication */
  $authProvider.facebook({
    authorizationEndpoint: 'https://www.facebook.com/v2.4/dialog/oauth',
    responseType: 'token', // Used for client-side Implicit Grant
    redirectUri: serverUri + ACCESS_AUTH_URLS.facebook,
    // url: ACCESS_AUTH_URLS.facebook,
    clientId: apikeys.facebook
  });

  /* Configure Satellizer to use session storage */
  // $authProvider.storageType = 'sessionStorage';
}

/* @ngInject */
function configAccessStrings($translateProvider) {

  $translateProvider.translations('en', {
    i18n: {
      access: {
        or: 'or',
        logout: 'Logout',
        loginTitle: 'Login',
        registerTitle: 'Register',
        loginLnk: 'login',
        registerLnk: 'register',
        registerPrompt: 'It is super easy to sign up. It takes just a few seconds!',
        fields: {
          loginBtn: 'Login',
          registerBtn: 'Register',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          rememberMe: 'Remember Me',
          password: 'Password',
          confirmPassword: 'Confirm Password'
        },
        validations: {
          'required.email': 'Email is required',
          'valid.email': 'Please provide valid email address',
          'required.password': 'Password is required',
          'required.fName': 'First name is required',
          'required.lName': 'Last name is required',
          'short.name': 'Name not long enough',
          'confirm.password': 'Please confirm password',
          'match.password': 'Both passwords must match'
        }
      }
    }
  });
}
