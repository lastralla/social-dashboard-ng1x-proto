import angular from 'angular';

require('d3');
require('nvd3');

require('../../common/core/_loader.js');
require('../../common/metrics/_loader.js');
require('../../../../node_modules/nvd3/build/nv.d3.css');
require('./charts.scss');

angular
  .module('sdApp.charts', [
    'sdApp.core',
    'sdApp.metrics',    // brings in metric UI labels
    require('angular-nvd3')
  ]);
