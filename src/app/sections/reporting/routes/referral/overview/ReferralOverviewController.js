import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './referralOverviewReportConfig.js';

class ReferralOverviewController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { ReferralOverviewController };
