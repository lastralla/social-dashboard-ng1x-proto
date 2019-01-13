import angular from 'angular';

/*
 * To reenable old code:
 *  - Uncomment require statements for  messaging, brands, calendar, goals, and posts
 *  - Uncomment the dependencies in sdApp module declartion below
 */

require('./common/core/_loader.js');
require('./common/core/services/_loader.js');
require('./common/navigation-auth/_loader.js');
require('./common/layout/_loader.js');

require('./main/loggedUser/_loader.js');
require('./main/access/_loader.js');
require('./main/home/_loader.js');

// require('./features/messaging/_loader.js');

// require('./sections/brands/_loader.js');
// require('./sections/posts/_loader.js');
require('./sections/reporting/_loader.js');

/*
 * The role of the sdApp module is to wire up other mostly independent modules. It
 * should not introduce any services, values, or constants of its own and should
 * only configure other modules.
 *
 */

angular.module('sdApp', [
  /*
   * Common Modules
   * ==============
   *
   * Common modules is shared code used by all features and sections.
   *
   */
  'sdApp.core',             // Configures angular, third-party, and utility modules
  'sdApp.navigationAuth',   // Navigation permissions logic
  'sdApp.layout',

  /*
   * Main
   * ====
   *
   * These are modules to get a minimally working app up and running. It is
   * essentially a login system that leads a user to a homepage.
   *
   */
  'sdApp.loggedUser',       // Manages setting/getting tokens for logged user
  'sdApp.access',           // Login/Register pages
  'sdApp.home',             // Homepage (i.e. Dashboard)

  /*
   * Features
   * ========
   *
   * A "feature" could be considered a part of a "page". A feature module likely
   * does not contain any routes. These modules should not have dependencies to
   * other features or sections. (Ideally features should be independent. Removing
   * a feature should not break the application.)
   *
   */
  // 'sdApp.messaging',

  /*
   * Sections
   * ========
   *
   * A "section" could be considered a set of "pages". A section module is
   * navigable and defines routes. It might also introduce its own features
   * (e.g. a calendar page and calendar widgets). These should not have
   * dependencies to other features or sections. (Ideally removing a section
   * should not break the application.)
   *
   */
  // 'sdApp.posts',            // Posting pages
  // 'sdApp.brands',           // Brand pages
  'sdApp.reporting'
])
.config(configLogProvider)
.run(bindStateChangeTitleSwitcher);

////////// Functions //////////

/* @ngInject */
function configLogProvider($logProvider) {
  // TODO dynamically pass in true or false at build time
  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }
}

/* @ngInject */
function bindStateChangeTitleSwitcher($rootScope) {
  $rootScope.$on('$stateChangeSuccess',
    (event, toState, toParams, fromState, fromParams) => {
      let appTitle = 'Social Dashboard';
      let pageTitle;

      if (toState.title) {
        pageTitle = toState.title + ' :: ' + appTitle;
      } else {
        pageTitle = appTitle;
      }

      $rootScope.pageTitle = pageTitle;
    });
}
