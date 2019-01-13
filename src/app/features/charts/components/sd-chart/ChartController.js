import angular from 'angular';

class ChartController {

  /* @ngInject */
  constructor($scope, $element, $compile) { // TODO is it possible to remove dependency on $scope
    let initialized = false;

    this.$onChanges = function() {
      if (this.model && !initialized) {
        /* Lookup chart component */
        let chartElem = findChartComponent(this.model.type);

        /* Append chart to template */
        if (chartElem) {
          let containerElem = $element[0].querySelector('.chart');
          let compiledElem = $compile(chartElem)($scope);
          angular.element(containerElem).append(compiledElem);
        }

        /* Make sure chart not appended more than once */
        initialized = true;
      }
    };
  }
}

export { ChartController };

////////// Functions //////////

function findChartComponent(type) {
  /* jscs:disable maximumLineLength */
  let chartElem;

  /* Lookup chart component */        // TODO review, this is starting to look REACT-ish
  if (type === 'NVD3.MultiBar') {
    chartElem = '<nvd3 options="$ctrl.model.options" data="$ctrl.model.data[$ctrl.metric]"></nvd3>';
  } else if (type === 'SD.CompareTable') {
    chartElem = '<sd-compare-table options="$ctrl.model.options" data="$ctrl.model.data"></sd-compare-table>';
  } else if (type === 'SD.StackedCompareTable') {
    chartElem = '<sd-stacked-compare-table options="$ctrl.model.options" data="$ctrl.model.data"></sd-stacked-compare-table>';
  } else if (type === 'SD.SortableTable') {
    chartElem = '<sd-sortable-table options="$ctrl.model.options" data="$ctrl.model.data"></sd-sortable-table>';
  } else if (type === 'SD.Funnel') {
    chartElem = '<sd-funnel options="$ctrl.model.options" data="$ctrl.model.data"></sd-funnel>';
  }

  return chartElem;
}
