import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './adsCommunityReportConfig.js';

class AdsCommunityController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { AdsCommunityController };
