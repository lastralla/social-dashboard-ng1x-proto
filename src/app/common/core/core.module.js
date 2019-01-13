import angular from 'angular';

// Requiring local storage module first since it does not work declared inline like other modules
require('angular-local-storage');

// Bring in base stylesheets
require('../../../../node_modules/angular-toastr/dist/angular-toastr.css');
require('../skin/_loader.js'); // up one level

require('./logger/_loader.js');
require('./router/_loader.js');
// require('./exception/_loader.js');
require('./eventNotifier/_loader.js');

require('../utils/helpers/_loader.js'); // up one level
require('../utils/debounce/_loader.js'); // up one level
require('../integrations/facebook/_loader.js'); // up one level

angular
  .module('sdApp.core', [
    /*
     * Angular modules (via npm)
     */
    require('angular-sanitize'),
    require('angular-animate'),
    require('angular-cookies'),
    require('angular-messages'),

    /*
     * 3rd-Party modules (i.e. via npm)
     */
    'LocalStorageModule', // required above
    require('angular-translate'),
    require('angular-toastr'),

    /*
     * Our reusable cross-application code modules
     */
    'sdApp.utils.helpers',
    'sdApp.utils.debounce',
    'sdApp.core.logger',
    'sdApp.core.router',
    // 'sdApp.core.exception', // FIXME
    'sdApp.core.eventNotifier',
    'sdApp.integrations.facebook'
  ]);
