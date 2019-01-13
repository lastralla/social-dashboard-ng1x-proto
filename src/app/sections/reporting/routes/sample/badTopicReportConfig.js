import { reporting } from '../../logic/reporting.js';
import { charts } from '../../../../features/charts/logic/charts.js'; // TODO not liking this import being here

let d3 = require('d3');

let dataResolvers = reporting.dataResolvers;
let dataFormatters = reporting.dataFormatters;

let reportConfig = {
  topic: 'Junk',

  /* Configure report's visualisations */
  views: {}
};

export { reportConfig };
