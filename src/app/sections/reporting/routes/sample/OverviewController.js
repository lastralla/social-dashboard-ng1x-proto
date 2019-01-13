/* Import Parent Controller */
import { ReportingController } from '../../ReportingController.js';

/* Import Report Configuration */
import { overviewConfig } from './overviewConfig.js';

class OverviewController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {
    /* Return the configuration */
    return overviewConfig;
  }

  /* Extend init method to add insights panel logic */
  init() {
    super.init();
  }
}

export { OverviewController };
