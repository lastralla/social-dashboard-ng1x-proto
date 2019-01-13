class ReportFilterController {

  /* @ngInject */
  constructor(reportFilters) {
    this.reportFilters = reportFilters;
  }

  applyFilter(filterName, stateName) {
    this.reportFilters.applyFilter(filterName, stateName);
  }
}

export { ReportFilterController };
