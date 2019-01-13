import angular from 'angular';
import { reporting } from '../logic/reporting.js';
import { deepAssign } from '../../../common/utils/deepAssign.js';
import { isEmptyObject } from '../../../common/utils/isEmptyObject.js';

angular
  .module('sdApp.reporting')
  .factory('reportFilters', reportFilters);

////////// Functions //////////

/* @ngInject */
function reportFilters($rootScope, report, loggedUser, REPORTING_DEFAULT_FILTER_STATES) {

  let filters = {};
  let appliedFilters = [];
  let filteredData = {};

  let service = {
    setFilters: setFilters,
    getFilters: getFilters,
    applyFilter: applyFilter
  };

  return service;

  ////////// Exposed Functions //////////

  function setFilters(configuredFilters) {

    let defaultFilterStates = JSON.parse(JSON.stringify(REPORTING_DEFAULT_FILTER_STATES));
    let filterStates = deepAssign(defaultFilterStates, (configuredFilters || {}));

    if (isEmptyObject(filters)) {
      /* Initialize filters first time through */
      initFilters();
    } else {
      /* Delete filters no longer needed (loses applied state) and initialize any new filters */
      deleteOldFilters();
      initNewFilters();
    }

    return filters;

    ////////// Functions //////////

    function initFilters() {
      /* Loop through and initialize each filter in config */
      Object.keys(filterStates).forEach((filterName) => {
        initFilterState(filterName);
      });
    }

    function initFilterState(filterName) {
      let activeState = filterStates[filterName].activeState;
      let filter = applyFilter(filterName, activeState);

      if (filter) {
        filters[filterName] = filter;
      }
    }

    function deleteOldFilters() {
      let noLongerConfigured = Object.keys(filters).filter((filterName) => {
        return !filterStates[filterName];
      });
      noLongerConfigured.forEach((filterName) => {
        delete filters[filterName];
      });
    }

    function initNewFilters() {
      let newlyConfigured = Object.keys(filterStates).filter((filterName) => {
        return !filters[filterName];
      });
      newlyConfigured.forEach((filterName) => {
        initFilterState(filterName);
      });
    }
  }

  function getFilters() {
    return filters;
  }

  /*
   * Changes active state in filter
   *
   * returns filter
   */
  function applyFilter(filterName, stateName) {
    let filter = getFilterDef(filterName);
    let currentUser = loggedUser.getLoggedUser();

    if (!currentUser) {
      return filter;
    }

    if (filter) {
      let activeBrand = loggedUser.getLoggedUser().activeBrand;
      let states = loggedUser.getLoggedUser().brands[activeBrand][filterName];

      /* Remove filter states that are not available in the current active brand */
      filter.availableStates = getFilterStatesInBrand(filter.availableStates, states);

      /* Apply active state */
      setActiveState(filter, stateName);

      let reportData = report.getReportData();

      /* Don't bother filtering if the report data is not yet resolved */
      if (reportData && !reportData.then) {
        let data = filterData(reportData, filterName);
        $rootScope.$emit('reporting.data', data);
      }
    }

    return filter;
  }

  ////////// Private Functions //////////

  function getFilterStatesInBrand(appStates, brandStates) {
    let statesAvailableInBrand = appStates.filter((state) => {
      return brandStates.indexOf(state.dataKey) >= 0;
    });

    return statesAvailableInBrand;
  }

  function setActiveState(filter, stateName) {
    if (filter.activeState !== stateName) {
      if (reporting.filters.isValidState(filter, stateName)) {
        filter.activeState = stateName;
        filter.isApplied = true;
      } else {
        filter.activeState = '';
        filter.isApplied = false;
      }
    }

    return filter;
  }

  function filterData(reportData, filterName) {
    /* jshint maxcomplexity: 5 */
    let filter = getFilterDef(filterName);
    let appliedFilterIndex = appliedFilters.indexOf(filterName);

    if (reportData.then) {
      return;
    }

    if (appliedFilterIndex >= 0) {
      /* Filter is already applied */
      filteredData = refreshFilters(reportData);

      if (filter.activeState === '') {
        appliedFilters.splice(appliedFilterIndex, 1);
      }
    } else {
      /* Filter not applied */
      let sourceData;

      if (appliedFilters.length === 0) {
        /* no filters applied, start from report data */
        sourceData = reportData;
      } else {
        /* already some filter, use filtered data */
        sourceData = filteredData;
      }
      filteredData = filter.filterFn(sourceData);

      appliedFilters.push(filterName);
    }

    return filteredData;
  }

  /*
   * Reapplies all the filters that are currently applied
   */
  function refreshFilters(sourceData) {
    let refreshedFilteredData = sourceData;

    appliedFilters.forEach((filterName) => {
      let filterItem = getFilterDef(filterName);
      refreshedFilteredData = filterItem.filterFn(refreshedFilteredData);
    });

    return refreshedFilteredData;
  }

  /*
   * Returns the filter definition if it exists
   */
  function getFilterDef(filterName) {
    if (reporting.filters[filterName]) {
      return reporting.filters[filterName];
    }

    return;
  }
}
