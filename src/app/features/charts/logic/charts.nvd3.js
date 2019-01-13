import { common } from './charts.common.js';
import { chartUtils } from './charts.utils.js';

let channelDefs = common.implementedChannels;

exports.nvd3 = {
  Types: {
    MonthlyBars: {
      id: 'NVD3.MultiBar',
      adapter: adaptToMonthlyNVD3Series,
      options: {
        chart: {
          type: 'multiBarChart',
          showControls: false,
          showLegend: false,
          stacked: true,
          xAxis: {
            showMaxMin: true
          },
          title: {
            enable: true
          }
        }
      }
    },
    DailyBars: {
      id: 'NVD3.MultiBar',
      adapter: adaptToDailyNVD3Series,
      options: {
        chart: {
          type: 'multiBarChart',
          showControls: false,
          showLegend: false,
          stacked: true,
          xAxis: {
            showMaxMin: true
          },
          title: {
            enable: true
          }
        }
      }
    }
  },
  Formats: {
    Full: {
      options: {
        chart: {
          width: 920,
          height: 290,
          margin: {
            top: 35,
            right: 20,
            bottom: 45,
            left: 60
          },
          yAxis: {
            axisLabelDistance: -20
          }
        }
      }
    },
    Small: {
      options: {
        chart: {
          width: 210,
          height: 220,
          margin: {
            top: 35,
            right: 20,
            bottom: 30,
            left: 70
          },
          yAxis: {
            axisLabelDistance: -30
          }
        }
      }
    }
  }
};

////////// Functions //////////

/*
 * Returns monthly data for each channel.
 */
function adaptToMonthlyNVD3Series(metricData, periodsArr) {
  let rangeValues = chartUtils.getMonthlyRangeValues(periodsArr);
  let formattedData = buildFormattedMetricData(metricData, rangeValues);

  return formattedData;
}

/*
 * Returns daily data for each channel.
 */
function adaptToDailyNVD3Series(metricData, periodsArr) {
  let timeOffsetByTimezone = 0 + (-1 * periodsArr[1].timezone);
  let rangeValues = chartUtils.getUnifiedDateRange(periodsArr);

  let formattedData = buildFormattedMetricData(metricData, rangeValues);

  return formattedData;
}

function buildFormattedMetricData(metricData, rangeValues) {
  let formattedData = [];

  for (let channel in metricData) {
    if (metricData.hasOwnProperty(channel)) {
      let channelObj = channelDefs[channel];
      let data = {
        key: channelObj ? channelObj.label : channelDefs.other.label,
        values: convertValuesToNVD3Series(metricData[channel]),
        color: channelDefs[channel].color
      };
      formattedData.push(data);
    }
  }

  return formattedData;

  ////////// Functions //////////

  function convertValuesToNVD3Series(valuesArr) {
    let series = [];

    valuesArr.forEach((item, index) => {
      if (rangeValues[index]) { // protects against backend sending more data than needed by chart
        series.push({
          x: rangeValues[index],
          y: item
        });
      }
    });

    return series;
  }
}
