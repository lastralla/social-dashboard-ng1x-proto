import { dateHelpers } from '../../../../common/utils/dateHelpers/dateHelpers.js';

let _reportPeriod;

class PeriodSelectorController {

  /* @ngInject */
  constructor($scope, eventNotifier, reportPeriod, REPORTING_MINIMUM_YEAR) {
    _reportPeriod = reportPeriod;

    eventNotifier.subscribe('reporting.data', () => {
      setViewModels.call(this);
      this.closeMenu();
    }, $scope);

    this.years = getYears(REPORTING_MINIMUM_YEAR);
    this.months = dateHelpers.getMonthKeysCollection();

    /* initialize the period selector current state */
    initPeriodSelectorState.call(this);
  }

  /*
   * Handles making the dropdown widget visible/hidden
   */
  toggleMenu() {
    if (this.menuActive) {
      this.resetSelection();
    } else {
      this.menuActive = true;
    }
  }

  closeMenu() {
    this.menuActive = false;
  }

  /*
   * Handles the Apply (submit) button in the widget
   */
  applyDatepickerSelection() {
    let newMonthIndex = dateHelpers.getMonthIndexFromKey(this.newMonth);

    this.selectedYear = this.newYear;
    this.selectedMonth = this.newMonth;
    this.selectedBreakdown = this.newBreakdown;
    this.reportCtrl.getReport(this.newYear, newMonthIndex, this.newBreakdown);

    this.closeMenu();
  }

  resetSelection() {
    initPeriodSelectorState.call(this);
    this.closeMenu();
  }

}

export { PeriodSelectorController };

////////// Functions //////////

function getYears(minimumReportYear) {
  let curYear = new Date().getFullYear();
  let years = [];

  while (curYear >= minimumReportYear) {
    years.push(curYear);
    curYear--;
  }

  return years;
}

/*
 * Sets the selector state to match the current report. Set when report loads and when reset button in dropwdown clicked.
 */
function initPeriodSelectorState() {
  this.newYear = this.selectedYear;
  this.newMonth = this.selectedMonth;
  this.newBreakdown = this.selectedBreakdown;
}

/*
 * Builds the view models for current active report
 */
function setViewModels() {
  this.menuActive = false;

  this.selectedPeriod = _reportPeriod.getCurrentPeriodsArray()[0];
  this.comparisonPeriod = _reportPeriod.getCurrentPeriodsArray()[1];

  /* reference the reports current period */
  this.selectedYear = this.selectedPeriod.year;
  this.selectedMonth = dateHelpers.getMonthKey(this.selectedPeriod.index);
  this.selectedBreakdown = this.selectedPeriod.breakdown;

  /* init new period selection */
  this.newYear = this.selectedYear;
  this.newMonth = this.selectedMonth;
  this.newBreakdown = this.selectedBreakdown;

  if (this.selectedPeriod.breakdown === 'weekly') {
    this.selectedPeriodLabel = dateHelpers.getWeekKey(this.newMonth);
    this.comparisonPeriodLabel = getComparisonKey(this.comparisonPeriod.index, 'weekly');
  } else {
    this.selectedPeriodLabel = dateHelpers.getMonthKey(this.selectedPeriod.index);
    this.comparisonPeriodLabel = getComparisonKey(this.comparisonPeriod.index);
  }
}

function getComparisonKey(index, breakdown) {
  if (breakdown === 'weekly') {
    return 'TODO';
  }

  return dateHelpers.getMonthKey(index);
}
