/*
 * Note: ReportingController must be extended and implement the
 * loadReportConfig() method which will return the report's configuration
 */

import { isEmptyObject } from '../../common/utils/isEmptyObject.js';

let _$scope;
let _popupMessage;
let _eventNotifier;
let _report;
let _reportFilters;
let _chartModels;

class ReportingController {

  /* @ngInject */
  constructor($scope, popupMessage, eventNotifier, report, reportFilters, chartModels) {
    _$scope = $scope;
    _popupMessage = popupMessage;
    _eventNotifier = eventNotifier;
    _report = report;
    _reportFilters = reportFilters;
    _chartModels = chartModels;

    this.init();
  }

  init() {
    /* Set the report configuration */
    setReportConfigModel.call(this);

    /* Initialize filter state (even if no filter UI component present) */
    this.filters = _reportFilters.setFilters(this.reportConfig);  // needed to satisfy metric getter functions

    /* Handle data retrieval */
    bindDataListener.call(this);
    this.getReport();
  }

  getReport(year, index, breakdown) {
    _report.loadReportData(year, index, breakdown);
  }

}

export { ReportingController };

////////// Functions //////////

function setReportConfigModel() {
  /* Expose report configuration */
  if (this.loadReportConfig === undefined) {
    throw new TypeError('Must implement loadReportConfig method');
  }
  this.reportConfig = this.loadReportConfig();

  _report.setConfig(this.reportConfig);
}

function bindDataListener() {
  _eventNotifier.subscribe('reporting.data', (e, reportData) => {
    let reportConfig = _report.getConfig();

    if (isEmptyObject(reportData)) {
      this.charts = {};
    } else {
      _chartModels.getChartModels(reportConfig, reportData)
        .then((chartModels) => {
          this.views = chartModels;
        });
    }
  }, _$scope);

  _eventNotifier.subscribe('loggedUser.newActiveBrand', (e, newBrand) => {
    _popupMessage.success(`Now viewing ${newBrand.name}`);
    this.getReport();
  }, _$scope);
}
