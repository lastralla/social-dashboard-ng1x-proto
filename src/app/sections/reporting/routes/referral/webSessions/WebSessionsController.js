import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './webSessionsReportConfig.js';

class WebSessionsController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { WebSessionsController };
