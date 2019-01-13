import angular from 'angular';
import { BrandsController } from './routes/BrandsController.js';

angular
  .module('sdApp.brands')
  .run(brandsModuleRun);

////////// Functions //////////

/* @ngInject */
function brandsModuleRun(routerHelper) {

  routerHelper.configureStates(getURLMappings());

  ////////// Functions //////////

  function getURLMappings() {

    return [{
      state: 'brands',
      config: {
        url: '/brands',
        layout: 'app-layout',
        views: {
          '': {
            controller: BrandsController,
            controllerAs: 'vm',
            templateUrl: require('./routes/brands.html')
          }
        },
        title: 'Brands',
        data: {
          navContext: [
            'authenticated'
          ],
          topLevelNav: {
            order: 3,
            label: 'brands'
          }
        }
      }
    }];

  }

}
