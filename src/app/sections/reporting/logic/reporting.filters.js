exports.filters = {
  isValidState: isValidState,
  hasNoActiveState: hasNoActiveState,
  getActiveState: getActiveState,
  getAvailableFilterStates: getAvailableFilterStates,

  /* Filter definition objects */
  channels: channelsFilterDef(),
  competitors: competitorsFilterDef()
};

////////// Exported members //////////

function isValidState(filter, stateName) {
  return filter.availableStates.find((state, i) => {
    return state.dataKey === stateName;
  });
}

function hasNoActiveState(filter) {
  throwIfInvalidFilter(filter);

  return (filter && filter.activeState === '');
}

function getActiveState(filter) {
  throwIfInvalidFilter(filter);

  return filter.activeState;
}

function getAvailableFilterStates(filter) {
  throwIfInvalidFilter(filter);

  let availableStates = filter.availableStates.map((i) => {
    return i.dataKey;
  });

  return availableStates;
}

function channelsFilterDef() {
  return {
    label: 'channels',
    availableStates: getChannelFilterStates(),
    defaultState: '',
    filterFn: function(inputData) {
      let activeState = this.defaultState;
      let filteredData = JSON.parse(JSON.stringify(inputData));

      if (activeState === '') {
        return inputData;
      }

      Object.keys(filteredData).forEach((view) => {
        Object.keys(filteredData[view]).forEach((metric) => {
          filteredData[view][metric].forEach((period) => {
            let active = period.channels[activeState];

            period.channels = {};
            period.channels[activeState] = active;
          });
        });
      });

      return filteredData;
    }
  };
}

function competitorsFilterDef() {
  return {
    label: 'competitors',
    availableStates: getCompetitorFilterStates(),
    defaultState: '',
    filterFn: function(inputData) {
      return inputData;
    }
  };
}

////////// Private Functions //////////

/**
 * Handles cases where there is a mismatch between a report's configuration and a metric's getter
 */
function throwIfInvalidFilter(filter) {
  if (!filter) {
    throw new Error('No such filter');
  }
}

function getChannelFilterStates() { // TODO move this to a better place
  // TODO read available channels from implemented channels in app's config and user's configured channels
  return [{
    dataKey: 'facebook',
    label: 'Facebook'
  }, {
    dataKey: 'twitter',
    label: 'Twitter'
  }, {
    dataKey: 'other', // WARNING: this is needed cause sometimes channel data contains 'other' for other channels
    label: 'Other'
  }];
}

function getCompetitorFilterStates() {
  // TODO read user's configured competitors
  return [{
    dataKey: 'comp1',
    label: 'ABC'
  }, {
    dataKey: 'comp2',
    label: 'XYZ'
  }];
}
