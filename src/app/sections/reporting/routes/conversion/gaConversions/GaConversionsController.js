import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './gaConversionsReportConfig.js';

class GaConversionsController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { GaConversionsController };

