import { chartUtils } from './charts.utils.js';
import { sd } from './charts.sd.js';
import { nvd3 } from './charts.nvd3.js';

exports.charts = {

  /* Base chart options applied to all charts (SD and NVD3) */
  getBaseChart: function() {
    return Object.freeze({
      options: {
        textColor: '#000000'
      }
    });
  },

  chartUtils: chartUtils,

  SD: sd,

  NVD3: nvd3
};
