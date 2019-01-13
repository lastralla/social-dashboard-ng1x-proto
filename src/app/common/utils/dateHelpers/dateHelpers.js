exports.dateHelpers = {
  setToFirstDayOfWeek: setToFirstDayOfWeek,
  getISOWeekIndex: getISOWeekIndex,
  getISOYear: getISOYear,
  getMonthKeysCollection: getMonthKeysCollection,
  getMonthIndexFromKey: getMonthIndexFromKey,
  getMonthKey: getMonthKey,
  getWeekKey: getWeekKey
};

////////// Implementation Functions //////////

/*
 * Takes a date and returns the date of the first day (Monday) of the week.
 */
function setToFirstDayOfWeek(date) {
  /* Normalize hours */
  date.setHours(0, 0, 0);

  /* Find how many days to adjust date (Monday is first day in ISO 8601 week) */
  let offset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - offset);

  return date;
}

function getISOWeekIndex(date) {
  let newDate = setToFirstDayOfWeek(date);

  /* Get week index by subtracting current date from start of year */
  let dateDiffInMillis = newDate - new Date(newDate.getFullYear(), 0, 1);

  /* Calculate index  */
  let numMillisInDay = 8.64e7;
  let weekIndex = Math.ceil(((dateDiffInMillis / numMillisInDay) + 1) / 7);

  return weekIndex;
}

function getISOYear(date) { // this function may be redundant
  let newDate = setToFirstDayOfWeek(date); // this line may be redundant?
  let year = newDate.getFullYear();

  return year;
}

function getMonthKeysCollection() {
  // Warning: key names must match those in i18n config
  return {
    1: 'jan',
    2: 'feb',
    3: 'mar',
    4: 'apr',
    5: 'may',
    6: 'jun',
    7: 'jul',
    8: 'aug',
    9: 'sep',
    10: 'oct',
    11: 'nov',
    12: 'dec'
  };
}

/*
 * Takes a 3-letter month key (e.g. jan|feb|mar) and returns its index (number between 1-12)
 */
function getMonthIndexFromKey(monthKey) {
  let monthsCollection = getMonthKeysCollection();
  let monthIndexes = Object.keys(monthsCollection);
  let monthsByKey = [];

  // Populate a temporary array with month abbreviations for purpose of performing an indexOf on it
  monthIndexes.forEach((i) => {
    monthsByKey.push(monthsCollection[i]);
  });

  let monthIndex = monthsByKey.indexOf(monthKey) + 1; // months use one-based indexes

  return monthIndex;
}

/*
 * Takes an index from 1-12 and returns a 3-letter month key (e.g. jan|feb|mar)
 */
function getMonthKey(index) {
  if (index < 1 || index > 12) {
    index = 1;
  }

  let monthKeys = getMonthKeysCollection();

  return monthKeys[index];
}

function getWeekKey(index) {
  return 'TODO';
}
