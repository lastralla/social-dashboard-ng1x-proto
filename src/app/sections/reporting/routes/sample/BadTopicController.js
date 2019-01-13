/* Import Parent Controller */
import { ReportingController } from '../../ReportingController.js';

/* Import Report Configuration */
import { reportConfig } from './badTopicReportConfig.js';

class BadTopicController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {

    /* Return the configuration */
    return reportConfig;
  }
}

export { BadTopicController };
