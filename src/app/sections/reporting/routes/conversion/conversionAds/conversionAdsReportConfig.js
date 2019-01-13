import { reporting } from '../../../logic/reporting.js';
import { charts } from '../../../../../features/charts/logic/charts.js';

let d3 = require('d3');

let reportTopic = 'conversion';
let commonGetters = reporting.commonGetters;
let dataFormatters = reporting.dataFormatters;
let chartUtils = charts.chartUtils;

let reportConfig = {
  topic: reportTopic,

  views: {
    /* ------------------------------------------------------ */
    /* --------------- Top Visualisation -------------------- */
    /* ------------------------------------------------------ */
    conversionFunnel: {
      charts: {
        /* ----- Funnel ----- */
        funnel: getConversionFunnelConfig(),

        /* ----- Table ----- */
        table: getConversionFunnelTable()
      },

      /* ----- Data Mappings for funnel visualisation ----- */
      dataMap: getConversionFunnelMap()
    },

    main: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: getMainChart1Config(),

        /* ----- Table ----- */
        table: getConversionValueTable()
      },

      /* ----- Data Mappings for 'main' visualisation ----- */
      dataMap: getMainDataMap()
    },

    conversionDetails: {
      charts: {
        /* ----- Bar Chart ----- */
        bars: conversionDetailsBars(),

        /* ----- Table ----- */
        table: conversionDetailsTable()
      },

      dataMap: getConversionDetailsMap()
    }
  }

};

export { reportConfig };

/* ---------------------------------------------------- */
/* --------------- Chart Configurations --------------- */
/* ---------------------------------------------------- */

function getConversionFunnelConfig() {
  return {
    type: charts.SD.Types.Funnel,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsFunnelValue',
      'reachFunnelValue',
      'clicksFunnelValue',
      'conversionVolumeFunnelValue'
    ],
    options: {
      labels: [
        'Impressions',
        'Reach',
        'Clicks',
        'Conversions'
      ],
      funnelSequence: [
        'impressionsFunnelValue',
        'reachFunnelValue',
        'clicksFunnelValue',
        'conversionVolumeFunnelValue'
      ]
    }
  };
} // end getConversionFunnelConfig

function getConversionFunnelTable() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'impressionsValue',
      'impressionsChangeValue',
      'impressionsChangePercent',

      'reachValue',
      'reachChangeValue',
      'reachChangePercent',

      'clicksValue',
      'clicksChangeValue',
      'clicksChangePercent',

      'conversionVolumeValue',
      'conversionVolumeChangeValue',
      'conversionVolumeChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'impressions',
        collectionKey: 'sum',
        totalValue: 'impressionsValue',
        comparison: {
          value: 'impressionsChangeValue',
          percent: 'impressionsChangePercent'
        }
      }, {
        metricName: 'reach',
        collectionKey: 'sum',
        totalValue: 'reachValue',
        comparison: {
          value: 'reachChangeValue',
          percent: 'reachChangePercent'
        }
      }, {
        metricName: 'clicks',
        collectionKey: 'sum',
        totalValue: 'clicksValue',
        comparison: {
          value: 'clicksChangeValue',
          percent: 'clicksChangePercent'
        }
      }, {
        metricName: 'conversionVolume',
        collectionKey: 'sum',
        totalValue: 'conversionVolumeValue',
        comparison: {
          value: 'conversionVolumeChangeValue',
          percent: 'conversionVolumeChangePercent'
        }
      }]
    }
  };
} // end getConversionFunnelTable

/*
 * Returns the part of the report configuration that configures a chart
 */
function getMainChart1Config() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'conversionValue'
    ],
    postProcessors: {
      conversionValue: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily Breakdown',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {
          tickFormat: d3.format(',.0f')
        }
      }
    }
  };
} // end getMainChart1Config

function getConversionValueTable() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'conversionValueValue',
      'conversionValueChangeValue',
      'conversionValueChangePercent',

      'numAdsValue',
      'numAdsChangeValue',
      'numAdsChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'conversionValue',
        collectionKey: 'sum',
        totalValue: 'conversionValueValue',
        comparison: {
          value: 'conversionValueChangeValue',
          percent: 'conversionValueChangePercent'
        }
      }, {
      metricName: 'numAds',
      collectionKey: 'sum',
      totalValue: 'numAdsValue',
      comparison: {
        value: 'numAdsChangeValue',
        percent: 'numAdsChangePercent'
      }
      }]
    }
  };
} // end getConversionValueTable

function conversionDetailsBars() {
  return {
    type: charts.NVD3.Types.DailyBars,
    format: charts.NVD3.Formats.Full,
    metrics: [
      'conversionVolume'
    ],
    postProcessors: {
      conversionVolume: [
        dataFormatters.orderPeriodsChronologically,
        dataFormatters.unifyChannelPeriods
      ]
    },
    options: {
      chart: {
        xAxis: {
          axisLabel: 'Daily Breakdown',
          tickFormat: chartUtils.monthAndDayTicksFactory()
        },
        yAxis: {
          tickFormat: d3.format(',.0f')
        }
      }
    }
  };
} // end conversionDetailsBars

function conversionDetailsTable() {
  return {
    type: charts.SD.Types.CompareTable,
    format: charts.SD.Formats.Full,
    metrics: [
      'conversionVolumeValue',
      'conversionVolumeChangeValue',
      'conversionVolumeChangePercent'
    ],
    options: {
      i18nPrefix: reportTopic,
      metricSets: [{
        metricName: 'conversionVolume',
        collectionKey: 'sum',
        totalValue: 'conversionVolumeValue',
        comparison: {
          value: 'conversionVolumeChangeValue',
          percent: 'conversionVolumeChangePercent'
        }
      }]
    }
  };
} // end conversionDetailsTable

/* -------------------------------------------------------- */
/* --------------- Chart Data Configuration --------------- */
/* -------------------------------------------------------- */

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getConversionFunnelMap() {
  return {
    impressionsFunnelValue: {
      metric: 'impressions',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    reachFunnelValue: {
      metric: 'reach',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    clicksFunnelValue: {
      metric: 'clicks',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },
    conversionVolumeFunnelValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getChannelsSeparatelyGetter('totalValue')
    },

    impressionsValue: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    impressionsChangeValue: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    impressionsChangePercent: {
      metric: 'impressions',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    reachValue: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    reachChangeValue: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    reachChangePercent: {
      metric: 'reach',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    clicksValue: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    clicksChangeValue: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    clicksChangePercent: {
      metric: 'clicks',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    conversionVolumeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    conversionVolumeChangeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    conversionVolumeChangePercent: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getConversionFunnelMap

/*
 * Returns the metric "data mappings" part of a visualisation's configuration
 */
function getMainDataMap() {
  return {
    conversionValue: {
      metric: 'conversionValue',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    conversionValueValue: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    conversionValueChangeValue: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    conversionValueChangePercent: {
      metric: 'conversionValue',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    },

    numAdsValue: {
      metric: 'numAds',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    numAdsChangeValue: {
      metric: 'numAds',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    numAdsChangePercent: {
      metric: 'numAds',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
} // end getMainDataMap

function getConversionDetailsMap() {
  return {
    conversionVolume: {
      metric: 'conversionVolume',
      getter: commonGetters.getChannelsSeparatelyGetter('breakdownValues')
    },
    conversionVolumeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('totalValue')
    },
    conversionVolumeChangeValue: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changeValue')
    },
    conversionVolumeChangePercent: {
      metric: 'conversionVolume',
      getter: commonGetters.getOnlyFromChannelsGetter('changePercent'),
      formatters: [
        dataFormatters.decimalToPercent
      ]
    }
  };
}
