import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './communityOverviewReportConfig.js';

class CommunityOverviewController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { CommunityOverviewController };
