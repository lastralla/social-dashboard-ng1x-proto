import { chartUtils } from '../../logic/charts.utils.js';

let _$filter;

class SortableTableController {

  /* @ngInject */
  constructor($filter, NOT_AVAIL_STR) {
    _$filter = $filter;

    this.columnOrder = this.options.columnOrder;

    this.$onChanges = () => {
      if (this.data) {
        if (!this.activeMetric) {
          this.selectColumn();
        } else {
          this.selectColumn(this.activeMetric);
        }
      }
    };

    this.notAvail = NOT_AVAIL_STR;
  }

  selectColumn(metric = this.columnOrder[0], isChangingOrder = false) {
    // let collectionName = this.options.sortByReferralMetrics[metric]; // TODO parameterise
    let collectionName = this.options.sortByCollections[metric];
    let collection = this.data[collectionName].all[0]; // TODO handle blank values here

    if (this.data[collectionName].all.length === 0) {
      console.log('selectColumn, no data', metric, this.data, this);
      this.activeMetric = metric;
      this.rows = [];
    } else {

      let orderedRowItems = orderItems.call(this, collection, metric, isChangingOrder);
      let unformattedItemValues = JSON.parse(JSON.stringify(orderedRowItems)); // Duplicate before changing values

      let formats = this.options.metricFormatting;
      let rows = formatMetricValues(unformattedItemValues, formats);

      this.activeMetric = metric;
      this.rows = rows;
    }
  }

  isEmptyValue(value, acceptZero) {
    return chartUtils.isEmptyValue(value, acceptZero);
  }

  getLabelKey(metricName) {
    return `i18n.metrics.${this.options.i18nPrefix}.${metricName}.label`;
  }
}

export { SortableTableController };

////////// Functions //////////

function setInitialRowOrders() {
  this.rowDescending = {};
  this.options.columnOrder.forEach((metric) => {
    this.rowDescending[metric] = true;
  });
}

function orderItems(collection, metric, isChangingOrder) {

  if (isChangingOrder) {
    /* Is re-sorting existing data */
    if (this.activeMetric === metric) {
      this.rowDescending[metric] = !this.rowDescending[metric];
      collection = collection.reverse();
    }
  } else {
    /* New data set, reset sorting states */
    setInitialRowOrders.call(this);
  }

  return collection;
}

/*
 * Takes an array of objects and formats their metric values according
 * to the passed in formatting options.
 *
 * e.g. for...
 *     valuesArr = [{
 *       metrics: {
 *         sales: 10
 *       }
 *     }];
 *     metricDisplay = [{
 *       key: 'sales',
 *       filter: 'currency',
 *       filterArgs: ['$', 2]
 *     }];
 *
 * outcome is like doing:
 *     $filter('currency')(10, '$', 2) // 10 becomes $10.00 in the UI
 */
function formatMetricValues(valuesArr, formats) {
  valuesArr.forEach((v) => {
    Object.keys(v.metrics).forEach((metric) => {
      /* Apply format filter to values if configured */
      if (formats[metric]) {
        let value = v.metrics[metric];
        let args = [value].concat(formats[metric].filterArgs);
        v.metrics[metric] = _$filter(formats[metric].filter)(...args);
      }
    });
  });
  return valuesArr;
}
