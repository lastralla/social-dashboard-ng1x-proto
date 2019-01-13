import angular from 'angular';

angular
  .module('sdApp.access')
  .directive('sdLogoutCta', sdLogoutCta);

////////// Functions //////////

/* @ngInject */
function sdLogoutCta(access, logger) {

  // Usage:
  // <ANY sd-logout-cta></ANY>
  let ddo = {
    restrict: 'E',
    template: '<a class="btn secondary-action" translate="i18n.access.logout"></a>',
    link: logoutLinkFn
  };

  return ddo;

  ////////// Functions //////////

  function logoutLinkFn(scope, elem) {
    elem.bind('click', () => {
      access.logout();
    });
  }

}
