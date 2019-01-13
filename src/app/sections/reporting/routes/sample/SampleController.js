/* Import Parent Controller */
import { ReportingController } from '../../ReportingController.js';

/* Import Report Configuration */
import { reportConfig } from './sampleReportConfig.js';

class SampleController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {

    /* Return the configuration */
    return reportConfig;
  }
}

export { SampleController };
