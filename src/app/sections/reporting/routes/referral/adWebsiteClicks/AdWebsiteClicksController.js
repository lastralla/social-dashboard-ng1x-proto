import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './adWebsiteClicksReportConfig.js';

class AdWebsiteClicksController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { AdWebsiteClicksController };
