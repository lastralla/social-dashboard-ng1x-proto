import angular from 'angular';
import { reporting } from './logic/reporting.js';

require('../../common/core/_loader.js');
require('../../features/charts/_loader.js');

require('./reporting.scss');

angular
  .module('sdApp.reporting', [
    'sdApp.core',
    'sdApp.charts'           // Bring in chart components (sdChart component used in route templates)
  ]);
