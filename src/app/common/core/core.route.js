import angular from 'angular';

angular
  .module('sdApp.core')
  .run(coreModuleRun);

////////// Functions //////////

/* @ngInject */
function coreModuleRun(routerHelper) {
  let four0four = '/404';

  routerHelper.configureStates(getURLMappings(), four0four);

  ////////// Functions //////////

  function getURLMappings() {

    return [{
      state: '404',
      config: {
        url: '/404',
        layout: 'access-layout',
        template: '<h1 translate="i18n.errors.404"></h1>',
        title: '404',
        data: {
          navContext: [
            'any'
          ]
        }
      }
    }, {
      state: 'error',
      config: {
        url: '/error',
        layout: 'access-layout',
        template: '<h1 translate="i18n.errors.general.error"></h1>',
        title: 'Error',
        data: {
          navContext: [
            'any'
          ]
        }
      }
    }];
  }

}
