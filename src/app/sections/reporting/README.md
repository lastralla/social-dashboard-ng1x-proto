# Steps to Create a New Report


## 1. Setup files in `routes` directory

- Create folder to hold new report: `src/app/sections/reporting/routes/newReport`
- Add the HTML template file `.../reporting/routes/newReport/newReport.html`
- Add controller file `.../reporting/routes/newReport/NewReportController.js`
- Add report configuration file `.../reporting/routes/newReport/newReportConfig.js`


## 2. Add boilerplate code to files

### Base HTML (newReport.html)

```
<h1 translate="i18n.reporting.titles.myReportTitle"></h1>

<sd-report-layout report-ctrl="$ctrl"
                  report-config="$ctrl.reportConfig">
  <header-slot>
    <!-- ... optional header compontents here ... -->
  </header-slot>
  <main-slot>
    <div class="report-section-visualisation">
        <h2 translate="i18n.reporting.titles.myVizTitle"></h2>
        <div class="visualisation-layout">
          <!-- ... chart compontents here ... -->
        </div>
    </div>
    <!-- ... more visualization ... -->
  </main-slot>
</sd-report-layout>
```


### Create new empty report config

This is what defines the charts that are referenced in the HTML partial and determines how the data fed into each chart is assembled.

```
let reportConfig = {
  /* Topic under which to find the metrics, unique to application */
  topic: '...', // Temporarily all metrics returned together under one topic (reports)

  /* Override the report's default filter state */
  filters: {},

  /* Configure report's visualisations */
  views: {
    someViewName: {
      charts: {
        someChartName: {
          type: charts.NVD3.Types.Bar,
          format: charts.NVD3.Formats.Full,
          metrics: [
            'whateverValue',
            'whateverChangePercent',
            'someOtherValue'
          ],
          postProcessors: {
            whateverValue: [...] // Array of functions to post process 'someMetric'
            // e.g. 'whateverChangePercent' and 'someOtherValue' has no processing so no key in postProcessors
          }
          options: { /* ... override chart options ... */ }
        },
        anotherChart: { /* ... */ }
      },
      // Map data for all charts in view
      dataMap: {
        whateverValue: {      // naming convention: metricName + property
          metric 'whatever',  // name in returned json
          getter: function(metric, filters) {
             /* ... return value property ... */
          }
        },
        whateverChangePercent: {
          metric 'whatever',
          getter: function(metric, filters) {
             /* ... return changePercent property ... */
          }
        },
        someOtherValue: { /* ... */ }
      },

      // Declare any rules, if any, that need to be satisified for the user
      displayRules: {
        isActive: function(userObj) { /* ... */ },
        passesSomeOtherCondition: function(userObj) { /* ... */ }
      }
    },

    someOtherView: {
      charts: { /* ... */ },
      dataMap: { /* ... */ }
    }

  }
};

export { reportConfig };
```


### Extend base controller (newReportController.js)

This is what connects the report's configuration to the page.

```
/* Import Parent Controller */
import { ReportingController } from '../../ReportingController.js';

/* Import Report Configuration */
import { reportConfig } from './newReportConfig.js';

class NewReportController extends ReportingController {

  /* Implement loadReportConfig required by ReportingController class  */
  loadReportConfig() {

    /* Return the configuration */
    return reportConfig;
  }
}

export { NewReportController };
```

### Populate HTML with report markup according to config

**Example: Visualization Containing One Chart**

```
<div class="report-section-visualisation">
  <h2 translate="i18n.reporting.titles.myVizTitle"></h2>
  <div class="visualisation-layout"
       ng-if="$ctrl.views['myViz'].show"><!-- checks whether to render the visualisation -->
    <div class="chart-ctn">
      <sd-chart model="$ctrl.views['myViz'].charts['chart1']"
                metric="myMetric"
                size="full(default)|big|small"
                title="optional title"></sd-chart>
    </div>
  </div>
</div>
```

**Example: Visualization Containing Several Charts**

```
<div class="report-section-visualisation">
  <div class="visualisation-layout two-up"
       ng-if="$ctrl.views['myOtherViz'].show"> <!-- two-up layout -->
    <div class="chart-ctn">
      <sd-chart model="$ctrl.views['myOtherViz'].charts['chart1']"
                metric="myMetric"
                size="small"></sd-chart>
    </div>
    <div class="chart-ctn"> <!-- chart-ctn contains several charts -->
      <sd-chart model="$ctrl.views['myOtherViz'].charts['chart2']"
                metric="myMetric"
                size="big"
                title="'i18n.reporting.titles.myChartTitle' | translate"></sd-chart>
                <!-- chart title (with i18n) -->
      <sd-chart model="$ctrl.views['myOtherViz'].charts['chart3']"
                metric="myMetric"
                size="big"
                title="'My Chart Title'"></sd-chart>
                <!-- chart title (no i18n) -->
    </div>
  </div>
</div>
```

Markup above would be configured like this in config file:

```
...

views: {
  myViz: {
    charts: {
      chart1: { ... },
      chart2: { ... }
    }
  },
  myOtherViz: {
    charts: {
      chart1: { ... },
      chart2: { ... },
      chart3: { ... }
    }
  }
  // generated chart model...
  // myViz : {
  //   show: true|false,
  //   charts: {
  //     chart1: { ... },
  //     chart2: { ... }
  //   }
  // },
  // myOtherViz : {
  //   show: true|false,
  //   charts: {
  //     chart1: { ... },
  //     chart2: { ... },
  //     chart3: { ... }
  //   }
  // }
}

...
```


## 3. Configure new report in module routes

Add route to new report in `reporting.route.js` by creating a nested state to the (abstract) _reporting_ state.

This assigns a URL to the report and links the HTML partial to its controller files

```
... other imports ...
import { NewReportController } from './routes/routes/newReport/NewReportController.js';

... more boilerplate ...

function getURLMappings() {

  let states = [{
    state: 'reporting',
    config: {
      abstract: true,
      ...
    }
  }, {
    state: 'reporting.root',
    config: {
      url: '/',
      ...
    }
  }, { // configuration for a new report
    state: 'reporting.newReport',
    config: {
      url: '/new',
      layout: 'app-layout',
      views: {
        '': {
          controller: NewReportController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/newReport/newReport.html')
        },
        'subNavigation': {
          ...
        }
      },
      title: 'My New Report'
    }
  }];

  return states;

}

... more ...
```
