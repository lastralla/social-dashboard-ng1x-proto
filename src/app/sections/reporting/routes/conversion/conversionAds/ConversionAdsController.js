import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './conversionAdsReportConfig.js';

class ConversionAdsController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { ConversionAdsController };
