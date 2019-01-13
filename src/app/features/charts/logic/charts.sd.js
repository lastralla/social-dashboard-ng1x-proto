import { common } from './charts.common.js';
import { chartUtils } from './charts.utils.js';

let channelDefs = common.implementedChannels;

exports.sd = {
  Types: {
    StackedCompareTable: {
      id: 'SD.StackedCompareTable',
      adapter: adaptToMonthlySeries,
      options: {
        title: ''
      }
    },
    CompareTable: {
      id: 'SD.CompareTable',
      adapter: adaptToMonthlySeries,
      options: {
        title: ''
      }
    },
    SortableTable: {
      id: 'SD.SortableTable',
      options: {
        title: ''
      }
    },
    Funnel: {
      id: 'SD.Funnel',
      options: {
        title: ''
      }
    }
  },
  Formats: {
    Full: {
      options: {
        width: '940px',
        height: '290px'
      }
    },
    Large: {
      options: {
        width: '700px',
        height: '290px'
      }
    },
    Small: {
      options: {
        width: '458px',
        height: '290px'
      }
    }
  }
};

////////// Functions //////////

/*
 * Returns monthly data for each channel.
 */
function adaptToMonthlySeries(metricData, periodsArr) {
  let rangeValues = chartUtils.getMonthlyRangeValues(periodsArr);
  let formattedData = {};

  for (let channel in metricData) {
    if (metricData.hasOwnProperty(channel)) {
      formattedData[channel] = convertToSeries(metricData[channel], rangeValues, channel);
    }
  }

  return formattedData;

  ////////// Functions //////////

  function convertToSeries(valuesArr, rangeValues, channel) {
    let series = [];

    valuesArr.forEach((item, index) => {
      let channelObj = channelDefs[channel];
      if (rangeValues[index]) {
        series.push({
          key: channelObj ? channelObj.label : channelDefs.other.label,
          time: rangeValues[index],
          value: item
        });
      }
    });

    return series;
  }
}
