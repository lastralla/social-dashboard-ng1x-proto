import { dateHelpers } from '../../../common/utils/dateHelpers/dateHelpers.js';

exports.query = {
  buildSelectionPeriod: buildSelectionPeriod,
  buildComparisonPeriod: buildComparisonPeriod,
  getDefaultSelectionPeriod: getDefaultSelectionPeriod,
  addTimezoneToPeriod: addTimezoneToPeriod
};

////////// Public Functions //////////

function buildSelectionPeriod(year, index, breakdown) {
  if (breakdown !== 'weekly') {
    breakdown = 'monthly';
  }

  return {
    breakdown: breakdown,
    year: year,
    index: index,
    complete: true
  };
}

function buildComparisonPeriod(selectedPeriod) {
  // TODO this needs to take into account weeks
  let year = (selectedPeriod.index === 1) ? selectedPeriod.year - 1 : selectedPeriod.year;
  let maxIndex = getMaxIndex(year, selectedPeriod.breakdown);
  let index = (selectedPeriod.index === 1) ? maxIndex : selectedPeriod.index - 1;

  return {
    breakdown: selectedPeriod.breakdown,
    year: year,
    index: index,
    complete: true
  };
}

function getDefaultSelectionPeriod() {

  // Since there is no data dumps beyond July 2016 automatically resolving the selection period
  // would result in reports getting 404 errors when requesting data.
  // Hardcoding the selected period to July 2016.
  // Remove next line to restore to normal behaviour
  return buildSelectionPeriod(2016, 7);


  let defaultBreakdown = 'monthly';
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth();
  let maxIndex = getMaxIndex(year, defaultBreakdown);

  let selectedYear = year;
  let selectedIndex = month;

  let selectedPeriod = buildSelectionPeriod(selectedYear, selectedIndex);

  return selectedPeriod;
}

function addTimezoneToPeriod(user, period) {
  let activeBrand = user.activeBrand;
  period.timezone = user.brands[activeBrand].timezone;

  return period;
}

////////// Private Functions //////////

function getMaxIndex(year, breakdown) {
  if (breakdown === 'weekly') {
    // TODO sometimes there are 53 weeks in a year
    return 52;
  }

  return 12;
}

function isValidReportPeriod(selectedPeriod) {
  /* Both must exist */
  if (!selectedPeriod) {
    return false;
  }

  /* Period must exist */
  if (!indexIsBeforePresentPeriod(selectedPeriod)) {
    return false;
  }

  /* Period index must make sense */
  if (!hasValidPeriodIndex(selectedPeriod)) {
    return false;
  }

  return true;

  ////////// Helper //////////

  function indexIsBeforePresentPeriod(period) {
    let now = new Date();
    let thisPeriodsYear = dateHelpers.getISOYear(now); // TODO can I call getFullYear directly?

    let presentPeriodIndex;
    if (period.breakdown === 'weekly') {
      presentPeriodIndex = dateHelpers.getISOWeekIndex(now);
    } else {
      presentPeriodIndex = now.getMonth();
    }

    /* Cannot be future year */
    if (period.year > thisPeriodsYear) {
      return false;
    }

    /* If same as currnt year cannot be larger or equal period index */
    if ((period.year === thisPeriodsYear) && (period.index >= presentPeriodIndex)) {
      return false;
    }

    /* All good */
    return true;
  }
}

function isValidComparisonPeriod(comparisonPeriod, selectedPeriod) {
  /* jshint maxcomplexity: 5 */

  /* Both must exist */
  if (!comparisonPeriod || !selectedPeriod) {
    return false;
  }

  /* Both must describe same time breakdown */
  if (comparisonPeriod.breakdown !== selectedPeriod.breakdown) {
    return false;
  }

  /* Period index must make sense */
  if (!hasValidPeriodIndex(comparisonPeriod)) {
    return false;
  }

  /* All good */
  return true;
}

function hasValidPeriodIndex(periodObj) {

  /*
   * Warning: Some years have week index up to 53. Checking for week index greater
   * than 53 but some years only have up to 52. Though it's very rare edge case as
   * this function is only an extra safety net against users hacking around.
   */
  let outOfBounds = ((periodObj.breakdown === 'monthly') && (periodObj.index > 12)) ||
                    ((periodObj.breakdown === 'weekly') && (periodObj.index > 53));

  if (outOfBounds) {
    return false;
  }

  return true;
}
