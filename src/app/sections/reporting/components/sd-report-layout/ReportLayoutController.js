import { isEmptyObject } from '../../../../common/utils/isEmptyObject.js';

class ReportLayoutController {

  /* @ngInject */
  constructor($scope, eventNotifier) {
    this.haveData = false; // set initial state

    eventNotifier.subscribe('reporting.data', (e, data) => {
      if (isEmptyObject(data)) {
        this.haveData = false;
      } else {
        this.haveData = true;
      }
    }, $scope);

    if (this.reportType === 'overview') {
      this.hasFilters = false;
    } else {
      this.hasFilters = true;
    }

  }

}

export { ReportLayoutController };
