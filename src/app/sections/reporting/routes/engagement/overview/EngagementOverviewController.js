import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './engagementOverviewReportConfig.js';

class EngagementOverviewController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { EngagementOverviewController };
