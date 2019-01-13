import { dateHelpers } from '../../../common/utils/dateHelpers/dateHelpers.js';

let d3 = require('d3');

exports.chartUtils = {
  // channelColorFactory: channelColorFactory,
  monthTicksFactory: monthTicksFactory,
  monthAndDayTicksFactory: monthAndDayTicksFactory,
  getUnifiedDateRange: getUnifiedDateRange,
  getMonthlyRangeValues: getMonthlyRangeValues,
  isEmptyValue: isEmptyValue
};

////////// Implemented Functions //////////

/*
 * Returns a function that can set a custom color scale for NVD3 charts.
 * Takes a param to define the key in the data that represents summed channel data.
 */
// Note not used now, might need for insights panel?
// function channelColorFactory(unifiedChannelsKey) {
//   /* jshint maxcomplexity: 5 */
//   return function(d) {
//     if (d.key === 'facebook') {
//       return '#3b5999';
//     } else if (d.key === 'twitter') {
//       return '#5c90cc';
//     } else if (d.key === unifiedChannelsKey || 'all') {
//       return '#4c75b3'; // mix of FB and TW
//     }
//     return '#888888';
//   };
// }

/*
 * Returns a function that can format time to show month and day label
 */
function monthTicksFactory() {
  return function(d) {
    return d3.time.format('%b')(d); // month only
  };
}

/*
 * Returns a function that can format time to show month and day label
 */
function monthAndDayTicksFactory() {
  return function(d) {
    return d3.time.format('%b %_d')(d); // month abrev and day
  };
}

function getUnifiedDateRange(periodsArr) {
  // TODO this gets called 5 times (one for each metric?) every time data is received instead of only one
  let range;
  let breakdown = periodsArr[1].breakdown;

  if (breakdown === 'weekly') {
    range = combineWeeks(periodsArr);
  } else {
    range = combineMonths(periodsArr);
  }

  return range;
}

function getMonthlyRangeValues(periodsArr) {
  let timeOffsetByTimezone = 0 + (-1 * periodsArr[1].timezone);

  let selectedPeriod = new Date(periodsArr[0].year, periodsArr[0].index - 1);
  let comparisonPeriod = new Date(periodsArr[1].year, periodsArr[1].index - 1);

  /* Set each period to first day of period (timezone adjusted)
   * only the month name is displayed so doesn't matter which day
   */
  selectedPeriod.setHours(timeOffsetByTimezone);
  comparisonPeriod.setHours(timeOffsetByTimezone);

  /* place data in correct order for display (periods arrive in reversed order) */
  return [comparisonPeriod, selectedPeriod];
}

/*
 * Checks if a metric's value is empty (or null). Also lets zeros be treated as non falsy
 */
function isEmptyValue(value, acceptZero = true) {
  if (value === 0 && acceptZero) {
    return false;
  }

  return !value;
}

////////// Private Functions //////////

function combineWeeks(periodsArr) {
  let range = [];
  let rangeLength = 14;
  let timeOffsetByTimezone = 0 + (-1 * periodsArr[1].timezone);

  let daysToAdd = periodsArr[1].index * 7;
  let day0 = dateHelpers.setToFirstDayOfWeek(new Date(periodsArr[1].year, 0));

  let i = 0;
  while (i < rangeLength) {
    let nextDay = new Date(day0.getFullYear(),
                           day0.getMonth(),
                           day0.getDate() + daysToAdd + i);

    nextDay.setHours(timeOffsetByTimezone);
    range.push(nextDay);

    i = i + 1;
  }

  return range;
}

function combineMonths(periodsArr) {
  let range = [];
  let rangeLength = getCombinedPeriodLength();
  let timeOffsetByTimezone = 0 + (-1 * periodsArr[1].timezone);

  let referenceDay = new Date(periodsArr[1].year, periodsArr[1].index - 1);

  let i = 0;
  while (i < rangeLength) {
    let nextDay = new Date(referenceDay.getFullYear(),
                           referenceDay.getMonth(),
                           referenceDay.getDate() + i);

    nextDay.setHours(timeOffsetByTimezone);
    range.push(nextDay);

    i = i + 1;
  }

  return range;

  ////////// Functions //////////

  function getCombinedPeriodLength() {
    /* Periods arrive in reverse order, reorder */
    let p0 = periodsArr[1];
    let p1 = periodsArr[0];

    let p0Day = new Date(Date.UTC(p0.year, p0.index));
    let p1Day = new Date(Date.UTC(p1.year, p1.index + 1)); // +1 for beginning of next period

    let totalDays = (p1Day - p0Day) / (1000 * 60 * 60 * 24);

    return totalDays;
  }
}
