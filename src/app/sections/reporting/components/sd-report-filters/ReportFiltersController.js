class ReportFiltersController {

  /* @ngInject */
  constructor(reportFilters) {
    let configuredFilters = this.config.filters;

    this.filters = reportFilters.setFilters(configuredFilters);
  }

}

export { ReportFiltersController };
