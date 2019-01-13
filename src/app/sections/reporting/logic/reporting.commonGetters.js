import { dataResolvers } from './reporting.dataResolvers.js';
import { filters } from './reporting.filters.js';

exports.commonGetters = {
  getChannelsSeparatelyGetter: getChannelsSeparatelyGetter,
  getOnlyFromChannelsGetter: getOnlyFromChannelsGetter,
  getFromAggregatedOrChannelsGetter: getFromAggregatedOrChannelsGetter
};

////////// Implemented Functions //////////

/*
 * Returns a getter function that retrieves data values for each channel
 */
function getChannelsSeparatelyGetter(valProp) {
  return function(metric, filtersState) {
    let channelsArr;

    if (filters.hasNoActiveState(filtersState.channels)) {
      /* No channel filter, get all channels */
      channelsArr = filters.getAvailableFilterStates(filtersState.channels);
    } else {
      /* Filtered by channel, get only active channel */
      channelsArr = [filters.getActiveState(filtersState.channels)];
    }

    let data = dataResolvers.getChannelValues(channelsArr, metric, valProp);

    return data
  };
}

/*
 * Returns a getter function that retrieves values only from channel-based data (not aggregated)
 */
function getOnlyFromChannelsGetter(valProp) {
  return function(metric, filtersState) {
    let channelsArr;

    if (filters.hasNoActiveState(filtersState.channels)) {
      /* No channel filter, get all channels */
      channelsArr = filters.getAvailableFilterStates(filtersState.channels);
    } else {
      /* Filtered by channel, get only active channel */
      channelsArr = [filters.getActiveState(filtersState.channels)];
    }

    let data = dataResolvers.addChannelValues(channelsArr, metric, valProp, 'sum');

    return data
  };
}

/*
 * Returns a getter function that retrieves values only from channel based data if filtering
 * by channel or otherwise gets the value from aggregated data
 */
function getFromAggregatedOrChannelsGetter(valProp, aggregatedDataKey) {
  return function(metric, filtersState) {
    /* Get from aggregated location */
    if (filters.hasNoActiveState(filtersState.channels)) {
      let data = dataResolvers.getAggregatedChannelSums(metric, valProp, aggregatedDataKey);
      return data;
    }

    const channelsArr = [filters.getActiveState(filtersState.channels)];
    const data = dataResolvers.addChannelValues(channelsArr, metric, valProp);

    /* Get from channels */
    return data;
  };
}
