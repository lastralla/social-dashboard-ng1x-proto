import angular from 'angular';

angular
  .module('sdApp.reporting')
  .constant('REPORTING_MINIMUM_YEAR', 2015)
  .constant('REPORTING_DEFAULT_FILTER_STATES', getDefaultFilterStates());

////////// Functions //////////

/*
 * Returns the default state filters are set to when initialising a report. This is usually
 * just an empty string (i.e.  filter not applied). The default state could be overridden in
 * a reports config.
 */
function getDefaultFilterStates() {
  return Object.freeze({
    channels: { // for now only channel filtering implemented
      activeState: ''
    }
  });
}
