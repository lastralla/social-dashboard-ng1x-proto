import angular from 'angular';

angular
  .module('sdApp.brands')
  .config(configBrandsStrings);

////////// Functions //////////

/* @ngInject */
function configBrandsStrings($translateProvider) {

  $translateProvider.translations('en', {
    i18n: {
      brands: {
        ACCOUNT_BRAND_TITLE: 'Account Brands',
        ACTIVE_ACCOUNT_TITLE: 'Active Account',
        CHANNELS_TITLE: 'Channels'
      }
    }
  });
}
