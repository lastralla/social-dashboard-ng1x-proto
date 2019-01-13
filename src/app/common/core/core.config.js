import angular from 'angular';

angular
  .module('sdApp.core')
  .config(configToastrProvider)
  // .config(configExceptionHandlerProvider)
  .config(configTranslateProvider)
  .config(configLocalStorageProvider)
  .config(configFacebookIntegrationProvider);

////////// Functions //////////

/* @ngInject */
function configToastrProvider(toastrConfig) {
  angular.extend(toastrConfig, {
    closeButton: true,
    newestOnTop: false,
    positionClass: 'toast-bottom-right',
    timeOut: 2000
  });
}

/* @ngInject */
// function configExceptionHandlerProvider(exceptionHandlerProvider) {
//   exceptionHandlerProvider.configure('[Error] ');
// }

/* @ngInject */
function configTranslateProvider($translateProvider) {

  $translateProvider.translations('en', {
    i18n: {
      general: {
        COLON_SEP: ':',
        copyright: 'copyright &copy; 2017',
        months: getMonthLabels(),
        errors: getErrorLabels()
      },

      /* Define labels for each section
       * - Each needs a name and a navLabel
       * - The key (i.e. home, posts, etc) is referenced in the routes data (topLevelNav)
       * - These labels should be in their own module config (example: reporting.config.js)
       */
      home: {
        name: 'Dashboard',
        navLabel: 'Dashboard'
      },
      posts: {
        name: 'Posts',
        navLabel: 'Posts'
      },
      brands: {
        name: 'Brands',
        navLabel: 'Brands'
      },
      goals: {
        name: 'Goals',
        navLabel: 'Goals'
      },
      calendar: {
        name: 'Calendar',
        navLabel: 'Calendar'
      }
    }
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');
}

/* @ngInject */
function configLocalStorageProvider(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('so')
    .setStorageType('localStorage');
}

/* @ngInject */
function configFacebookIntegrationProvider(facebookIntegrationProvider) {
  /* Config Facebook API calls */
  facebookIntegrationProvider.setDefaultParams({
    version: 'v2.4',
    status: false,
    cookie: true,
    xfbml: false
  });

  facebookIntegrationProvider.setEventsList([
    'auth.authResponseChange',
    'auth.statusChange'
  ]);
}

function getMonthLabels() {
  return {
    jan: {
      full: 'January',
      abbr: 'Jan.'
    },
    feb: {
      full: 'February',
      abbr: 'Feb.'
    },
    mar: {
      full: 'March',
      abbr: 'Mar.'
    },
    apr: {
      full: 'April',
      abbr: 'Apr.'
    },
    may: {
      full: 'May',
      abbr: 'May'
    },
    jun: {
      full: 'June',
      abbr: 'June'
    },
    jul: {
      full: 'July',
      abbr: 'July'
    },
    aug: {
      full: 'August',
      abbr: 'Aug.'
    },
    sep: {
      full: 'September',
      abbr: 'Sept.'
    },
    oct: {
      full: 'October',
      abbr: 'Oct.'
    },
    nov: {
      full: 'November',
      abbr: 'Nov.'
    },
    dec: {
      full: 'December',
      abbr: 'Dec.'
    }
  };
}

function getErrorLabels() {
  return {
    'general.error': 'An error has occurred.',
    'server.error': 'We are experiencing some problems right now.',
    '404': '404 - File Not Found',
    'authentication.error': 'Could not log you in with that email and password.',
    'user.exists': 'Could not create user. User may already exist.'
  };
}
