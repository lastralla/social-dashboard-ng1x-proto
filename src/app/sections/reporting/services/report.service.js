import angular from 'angular';
import { reporting } from '../logic/reporting.js';

let _$http;
let _CORE_API_PATH;
let _popupMessage;
let _eventNotifier;
let _metrics;

let reportConfig;
let reportData;

angular
  .module('sdApp.reporting')
  .factory('report', report);

////////// Functions //////////

/* jshint maxparams: 7 */
/* @ngInject */
function report($http, CORE_API_PATH, popupMessage, eventNotifier, reportPeriod, loggedUser, metrics) { /* jscs:disable maximumLineLength */

  _$http = $http;
  _CORE_API_PATH = CORE_API_PATH;
  _popupMessage = popupMessage;
  _eventNotifier = eventNotifier;
  _metrics = metrics;

  let service = {
    setConfig: setConfig,
    getConfig: getConfig,
    loadReportData: loadReportData,
    getReportData: getReportData
  };

  return service;

  ////////// Implementations //////////

  /*
   * Stores the current report's configuration
   */
  function setConfig(config) {
    reportConfig = config;
  }

  /*
   * Returns the current report's configuration
   */
  function getConfig() {
    return reportConfig;
  }

  /*
   * Requests data from api for current active brand
   */
  function loadReportData(year, index, breakdown) {
    if (!reportConfig) {
      throw new Error('Cannot load report');
    }

    let currentUser = loggedUser.getLoggedUser();

    if (!currentUser) {
      return {};
    }

    let periodsArr = reportPeriod.resolveReportPeriods(year, index, breakdown);
    let activeBrandId = currentUser.activeBrand;

    reportData = getTopicForBrand(activeBrandId, periodsArr);

    return reportData;
  }

  /*
   * Returns the current report's data
   */
  function getReportData() {
    return reportData;
  }

}

////////// Private Functions //////////

function getTopicForBrand(brandId, periodsArr) {
  let URL = buildUrl(periodsArr);

  if (!brandId) {
    _popupMessage.error('i18n.reporting.errors.cannotLoadReport');

    reportData = {};
    _eventNotifier.notify('reporting.data', reportData);

    return reportData;
  }

  let dataRequest = _$http.get(URL, {
    params: {
      topic: reportConfig.topic,
      brand: brandId
    }
  })
    .then((response) => {
      let data;
      /* Map metric names from backend names to frontend names */
      data = reMapMetricNames(response.data);

      /* Convert raw data to report data */
      let processedData = mapToDataViews(reportConfig, data);
      reportData = processedData;

      /* Announce */
      _eventNotifier.notify('reporting.data', reportData);

      /* Pass along response */
      return response;
    })
    .catch((err) => {
      _popupMessage.error('i18n.reporting.errors.invalidDate');
      reportData = {};
      _eventNotifier.notify('reporting.data', reportData);
    });

  return dataRequest;
}

function reMapMetricNames(responseData) {
  let topic = reportConfig.topic;
  let rawMetrics = responseData[0].report;

  rawMetrics.forEach((i, index) => {
    let metricName = _metrics.getMetricNameByDataKey(topic, i.name);

    if (!metricName) {
      /* Filter out any metrics frontend doesn't know about */
      rawMetrics.splice(index, 1);
    } else {
      /* Replace with frontend name */
      i.name = metricName;
    }
  });

  return responseData;
}

function mapToDataViews(reportConfig, rawData) {
  /* Check server response not missing data */
  if (!rawData[0].report || !rawData[1].report) {
    _popupMessage.error('i18n.reporting.errors.cannotLoadReport');

    return {};
  }

  let mappedData = reporting.mapDataToUIStructure(reportConfig.views, rawData);

  return mappedData;
}

function buildUrl(periodsArr) {
  let breakdown = periodsArr[0].breakdown;
  let year = periodsArr[0].year;
  let index = periodsArr[0].index;

  return `${_CORE_API_PATH}report/${breakdown}/${year}/${index}/`;
}
