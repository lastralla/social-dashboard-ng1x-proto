import { ReportingController } from '../../../ReportingController.js';
import { reportConfig } from './adsRoiReportConfig.js';

class AdsRoiController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    return reportConfig;
  }
}

export { AdsRoiController };
