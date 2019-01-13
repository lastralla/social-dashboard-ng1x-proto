import angular from 'angular';

angular
  .module('sdApp.access')
  .constant('ACCESS_ROUTING_CONF', Object.freeze({
    loginState: 'login',
    loginRoute: '/access/login',
    registerRoute: '/access/register',
    homeRoute: '/'
  }))
  .constant('ACCESS_AUTH_URLS', Object.freeze({
    login: '/authenticate/login',
    register: '/authenticate/register',
    facebook: '/authenticate/facebook'
  }));
