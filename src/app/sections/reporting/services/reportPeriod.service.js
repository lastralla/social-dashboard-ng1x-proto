import angular from 'angular';
import { reporting } from '../logic/reporting.js';

angular
  .module('sdApp.reporting')
  .factory('reportPeriod', reportPeriod);

////////// Functions //////////

/* @ngInject */
function reportPeriod(loggedUser, popupMessage) {
  let currentReportPeriods;

  let service = {
    resolveReportPeriods: resolveReportPeriods,
    getCurrentPeriodsArray: getCurrentPeriodsArray
  };

  return service;

  ////////// Implementations //////////

  /*
   * Returns array of report periods from passed in params if possible,
   * otherwise sets period to last full period from current date.
   *
   * Currently comparison period is always set to the period
   * before selected period.
   */
  function resolveReportPeriods(year, periodIndex, breakdown) {
    let periodsArr = getRequestedPeriods(year, periodIndex, breakdown);

    currentReportPeriods = periodsArr;

    return currentReportPeriods;
  }

  /*
   * Returns the selected period and its comparison period
   */
  function getCurrentPeriodsArray() {
    if (!currentReportPeriods) {
      return resolveReportPeriods();
    }

    return currentReportPeriods;
  }

  ////////// Private Function //////////

  function getRequestedPeriods(year, periodIndex, breakdown) {
    /* jshint maxcomplexity: 5 */

    let query = reporting.query;

    let selectedPeriod;

    if (typeof year === 'undefined' || typeof periodIndex === 'undefined') {
      if (currentReportPeriods) {
        return currentReportPeriods;
      }
      selectedPeriod = query.getDefaultSelectionPeriod();
    } else {
      selectedPeriod = query.buildSelectionPeriod(year, periodIndex, breakdown);
    }

    let comparisonPeriod = query.buildComparisonPeriod(selectedPeriod);

    /* Decorate periods with brand timezone settings */
    let currentUser = loggedUser.getLoggedUser();

    if (currentUser) { // if no user, app will eventually redirect to login
      query.addTimezoneToPeriod(currentUser, selectedPeriod);
      query.addTimezoneToPeriod(currentUser, comparisonPeriod);
    }

    return [selectedPeriod, comparisonPeriod];
  }
}
