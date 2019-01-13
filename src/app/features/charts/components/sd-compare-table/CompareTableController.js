import { dateHelpers } from '../../../../common/utils/dateHelpers/dateHelpers.js';
import { reporting } from '../../../../sections/reporting/logic/reporting.js';
import { chartUtils } from '../../logic/charts.utils.js';

class CompareTableController {

  /* @ngInject */
  constructor(NOT_AVAIL_STR) {
    this.$onChanges = function() {
      if (!this.data || !this.options) {
        return;
      }

      let periodDates = getPeriodDates(this.options.metricSets, this.data);

      let selected = periodDates[0];
      let comparison = periodDates[1];

      this.selectedMonth = dateHelpers.getMonthKey(selected.getMonth() + 1);
      this.selectedMonthYr = `'${(selected.getUTCFullYear()).toString().slice(2)}`;

      this.comparisonMonth = dateHelpers.getMonthKey(comparison.getMonth() + 1);
      this.comparisonMonthYr = `'${(comparison.getUTCFullYear()).toString().slice(2)}`;

      this.sets = [];
      updateSets.call(this, this.options.metricSets, this.data);

      this.notAvail = NOT_AVAIL_STR;
    };
  }

  isEmptyValue(value, acceptZero) {
    return chartUtils.isEmptyValue(value, acceptZero);
  }

  getLabelKey(metricName) {
    return `i18n.metrics.${this.options.i18nPrefix}.${metricName}.label`;
  }

  /*
   * Checks a metric's change value (positive or negative) is considered an improvement
   * (i.e. positive change values for sales not the same as positive change values for cost)
   */
  isBetter(changeAmt, metricName) {
    let isBetter;

    if (reporting.wantPositiveChange(metricName)) {
      isBetter = changeAmt > 0;
    } else {
      isBetter = changeAmt < 0;
    }

    return isBetter;
  }

  /*
   * Checks a metric's change value (positive or negative) is considered an worse than previous value
   * (i.e. positive change values for sales not the same as positive change values for cost)
   */
  isWorse(changeAmt, metricName) {
    let isWorse;

    if (reporting.wantPositiveChange(metricName)) {
      isWorse = changeAmt < 0;
    } else {
      isWorse = changeAmt > 0;
    }

    return isWorse;
  }

}

export { CompareTableController };

function updateSets(metricSets, data) {
  metricSets.forEach((set) => {
    // FIXME Temp hack, trying to guess what channel is applied. Filter state should ideally be passed in.
    let dataSetKey;

    if (data[set.totalValue][set.collectionKey]) {
      dataSetKey = metricSets[0].collectionKey;
    } else if (data[set.totalValue].facebook) {
      dataSetKey = 'facebook';
    } else {
      // hopefully it's twitter!
      dataSetKey = 'twitter';
    }

    /* Build data for table */
    let dataObj = {
      metricName: set.metricName,
      totalValue: data[set.totalValue][dataSetKey], // collection key is the problem!
      changeValue: data[set.comparison.value][dataSetKey],
      changePercent: data[set.comparison.percent][dataSetKey]  // value passed into change direction component (arrows)
    };
    this.sets.push(dataObj);
  });
}

function getPeriodDates(metricSets, data) {
  // FIXME Temp hack, trying to guess what channel is applied. Filter state should ideally be passed in.
  let dataSetKey;

  if (data[metricSets[0].totalValue][metricSets[0].collectionKey]) {
    dataSetKey = metricSets[0].collectionKey;
  } else if (data[metricSets[0].totalValue].facebook) {
    dataSetKey = 'facebook';
  } else {
    // hopefully it's twitter!
    dataSetKey = 'twitter';
  }

  /* Read periods from first metric set since all should be the same */
  let anyData = data[metricSets[0].totalValue][dataSetKey];
  let periodDates = [anyData[1].time, anyData[0].time]; // Dates in periods are reversed, so 1 before 0

  return periodDates;
}
