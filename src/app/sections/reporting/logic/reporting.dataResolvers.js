exports.dataResolvers = {
  /* Functions to retrieve data under 'aggregated' (i.e. metric.aggregated.whatever) */
  getAggregatedChannelSums: getAggregatedChannelSums,
  // getAggregatedChannelValues: getAggregatedChannelValues, // TBD still needed?
  addAggregatedChannelValues: addAggregatedChannelValues, // TBD still needed?

  /* Functions to retrieve channel-based data (i.e. metric.channels.whatever) */
  getChannelValues: getChannelValues,
  addChannelValues: addChannelValues,

  /* Function for sortable tables data */
  getOrderedCollection: getOrderedCollection
};

////////// Implemented Functions //////////

function getAggregatedChannelSums(metric, valProp, aggregatedKey) {
  let dataObj = {};
  let key = aggregatedKey || 'all';

  dataObj[key] = metric.aggregated.sumAllChannels[valProp];

  return dataObj;
}

// function getAggregatedChannelValues(metric, valProp) {
//   let dataObj = {};
//   let channels = Object.keys(metric.aggregated.channels);

//   channels.forEach((channel) => {
//     dataObj[channel] = metric.aggregated.channels[channel][valProp];
//   });

//   return dataObj;
// }

function addAggregatedChannelValues(metric, valProp) {
  let dataObj = {};
  let channels = Object.keys(metric.aggregated.channels);
  let count = 0;

  channels.forEach((channel) => {
    count = count + metric.aggregated.channels[channel][valProp];
  });

  dataObj.sum = count;

  return dataObj;
}

/*
 * Retrieves the values for each of channels (passed in) and returns them as...
 *
 *   {
 *     facebook: ...,
 *     twitter: ...
 *   }
 */
function getChannelValues(channels, metric, valProp) {
  let dataObj = {};

  if (Array.isArray(channels)) {
    channels.forEach((channel) => {
      dataObj[channel] = metric.channels[channel][valProp];
    });
  } else {
    dataObj[channels] = metric.channels[channels][valProp];
  }

  return dataObj;
}

/*
 * Retrieves the values for all channels (passed in), adds them together and returns them as...
*
 *   {
 *     sum: ...
 *   }
 */
function addChannelValues(channelsArr, metric, valProp, aggregatedDataKey) {
  let dataKey;

  if (channelsArr.length > 1) {
    dataKey = aggregatedDataKey;
  } else {
    dataKey = channelsArr[0];
  }

  const dataObj = {};
  dataObj[dataKey] = 0;

  /* Add values in  */
  if (valProp === 'breakdownValues') {
    dataObj[dataKey] = addBreakdownValues();
    return dataObj;
  }

  let count = 0;

  /* Add single values */
  channelsArr.forEach((channel) => {
    count = count + metric.channels[channel][valProp];
  });

  dataObj[dataKey] = count;

  return dataObj;

  ////////// Functions //////////

  function addBreakdownValues() {
    const channelNames = Object.keys(metric.channels);
    const anyChannel = metric.channels[channelNames[0]]; // Use any of the channels since they all should have same number of values

    const addedValsArr = [];

    anyChannel.breakdownValues.forEach((item, breakdownIndex) => {
      let totalVal = 0;

      channelsArr.forEach((channel) => {
        totalVal = totalVal + metric.channels[channel].breakdownValues[breakdownIndex];
      });

      addedValsArr.push(totalVal);
    });

    return addedValsArr;
  }
}

function getOrderedCollection(metric, collectionKey, orderArr, sortCollection) {
  const orderedItems = [];

  // Handle missing data (like when no ads for category)
  if (!metric[sortCollection] || !metric[sortCollection][orderArr]) {
    return {
      all: orderedItems
    };
  }

  const order = metric[sortCollection][orderArr];

  order.forEach((id) => {
    const item = metric[collectionKey].find((collectionItem) => {
      return collectionItem.id === id;
    });

    if (item) {
      orderedItems.push(item);
    }
  });

  return {
    all: orderedItems
  };
}
