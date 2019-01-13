/*
 * Run this file in Node to generate a lookup.
 * It reads metrics-data-dump.json and produces
 *
 *   1) From dev_home/metrics-generator
 *   2) Run > node metricsLookupTablesGenerator.js
 *   3) For each metric, fill in display label and override any key names that are different in frontend
 *   4) Copy generated files into metrics module where they are exported into METRICS_LOOKUP constant
 *
 *   WARNING: this needs to be done each time, there's nothing keeps track of changes (other than git diff)
 */

var fs = require('fs');
var path = require('path');

generateMetricLookup('./communityDump.json', 'communityMetrics');
generateMetricLookup('./engagementDump.json', 'engagementMetrics');
generateMetricLookup('./conversionDump.json', 'conversionMetrics');
generateMetricLookup('./referralDump.json', 'referralMetrics');


function generateMetricLookup(inputFilePath, outputFileName) {
  var dataContents;

  fs.readFile(path.join(__dirname, inputFilePath), function read(err, contents) {
    if (err) {
      throw err;
    }

    dataContents = JSON.parse(contents);

    processResults(outputFileName, dataContents);
  });

  function processResults(outputFileName, contents) {

    // only care about what's in first period (it's the one that contains 'best of' metrics)
    var p0 = contents.data[0].report;

    console.log('Reading metrics for ' + outputFileName);
    console.log('Number of metrics for ' + outputFileName + ': ' + p0.length);

    console.log('Generating file... ' + outputFileName);
    createLookupFile(p0, outputFileName);
  };

  function createLookupFile(periodObj, outputFileName) {
    var metrics = {};

    var metricNames = [];

    periodObj.forEach(function(i) {
      metricNames.push(i.name);
    });

    metricNames.forEach(function(metricName) {
      metrics[metricName] = {
        dataKey: metricName,
        label: ''
      };
    });

    var contentsExportDeclaration = 'exports.' + outputFileName + ' = ';
    var contents =   contentsExportDeclaration +
                     JSON.stringify(metrics, null, 2)
                           .replace(/"/g, '\'')
                           .replace(/\'dataKey\'/g, 'dataKey')
                           .replace(/\'label\'/g, 'label') +
                     ';\r\n';

    fs.writeFile(path.join(__dirname, './' + outputFileName + '.js'), contents, function(err) {
        if (err) {
          throw err;
        }

        console.log(outputFileName + ' done!');
    });
  }

}
