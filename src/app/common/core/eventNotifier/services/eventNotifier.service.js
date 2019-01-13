import angular from 'angular';

/*
 * A wrapper service around Angular's native event binding system.
 *
 * It allows for binding events on rootScope that automatically
 * get unbound when the "listening" scope is destroyed.
 * inspired by: http://www.codelord.net/2015/05/04/angularjs-notifying-about-changes-from-services-to-controllers/
 *
 * This is useful for doing event binding inside controllers without needing to worry about duplicate events
 * being bound every time the controller is instantiated (or having to manually unbind each event)
 *
 *    Example 1: binding in a controller...
 *    eventNotifier.subscribe('some.event.name', (evt, data) => {...}, theControllerScope);
 *
 *    Example 2: binding to rootScope
 *    eventNotifier.subscribe('some.event.name', (evt, data) => {...}); // listening scope is rootScope
 *
 *    Example 3: emitting an event
 *    eventNotifier.notify('some.event.name', data);
 *
 */
angular
  .module('sdApp.core.eventNotifier')
  .factory('eventNotifier', eventNotifier);

////////// Functions //////////

/* @ngInject */
function eventNotifier($rootScope) {
  let service = {
    subscribe: subscribe,
    notify: notify
  };

  return service;

  ////////// Functions //////////

  function subscribe(eventName, cb, scope) {
    // Future: rework notifier so that scope argument need not rely on $scope. Currently need
    // to inject $scope whenever using eventNotifier in controller.
    //
    // Waiting for better support for Angular 2 style Lifecycle Hooks in Angular 1.x
    // see: https://github.com/angular/angular.js/issues/14020

    let listenerScope = (scope && scope.$on && scope.$emit) ? scope : $rootScope;
    let deregister = $rootScope.$on(eventName, cb);

    /* Stop listening for the event on the rootScope */
    listenerScope.$on('$destroy', function() {
      deregister();
    });
  }

  function notify(eventName, data) {
    $rootScope.$emit(eventName, data);
  }

}
