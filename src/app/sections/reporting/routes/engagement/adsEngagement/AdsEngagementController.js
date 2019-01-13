import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './adsEngagementReportConfig.js';

class AdsEngagementController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { AdsEngagementController };
