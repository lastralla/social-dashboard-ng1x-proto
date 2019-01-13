/*
 * This module formats reports data from one format to another
 */

exports.dataFormatters = {
  decimalToPercent: decimalToPercent,
  unifyChannelPeriods: unifyChannelPeriods,
  orderPeriodsChronologically: orderPeriodsChronologically
};

////////// Implemented Functions //////////

function decimalToPercent(value) {
  return value * 100;
}

/*
 * Takes metricData merges each channel's periods into one collection
 */
function unifyChannelPeriods(channels) {
  Object.keys(channels).forEach((channel) => {
    channels[channel] = getAllValues(channels[channel]);
  });

  return channels;

  ////////// Function //////////

  function getAllValues(periods) {
    let items = [];

    /* Loop over periods */
    periods.forEach((periodItem) => {
      /* Handle if it's array instead of raw value */
      if (typeof periodItem === 'object') {
        periodItem.forEach((subItem) => {
          items.push(subItem);
        });
      } else {
        items.push(periodItem);
      }
    });

    return items;
  }
}

/*
 * Reverses the order of the periods for each channel (or sum of channels).
 */
function orderPeriodsChronologically(channels) {
  Object.keys(channels).forEach((channel) => {
    channels[channel] = reverseValues(channels[channel]);
  });

  return channels;

  ////////// Function //////////

  function reverseValues(metricValue) {
    let items = [];
    let rev = metricValue.slice().reverse();

    /* Loop over periods*/
    rev.forEach((periodItem) => {
      items.push(periodItem);
    });

    return items;
  }
}
