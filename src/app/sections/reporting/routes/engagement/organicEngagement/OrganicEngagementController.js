import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './organicEngagementReportConfig.js';

class OrganicEngagementController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { OrganicEngagementController };
