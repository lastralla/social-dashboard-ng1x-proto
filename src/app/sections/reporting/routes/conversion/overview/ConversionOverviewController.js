import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './conversionOverviewReportConfig.js';

class ConversionOverviewController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { ConversionOverviewController };
