// import { dateHelpers } from '../../../../common/utils/dateHelpers/dateHelpers.js';

class FunnelController {

  /* @ngInject */
  constructor(NOT_AVAIL_STR) {
    this.notAvail = NOT_AVAIL_STR;
    this.hasFacebook = true;
    this.hasTwitter = true;
  }

  $onChanges() {
    // Handle period labels
    // TODO but way to complicated at this point...

    // Handle funnel data
    this.funnelData = [];

    this.hasFacebook = checkDataHasChannel.call(this, 'facebook');
    this.hasTwitter = checkDataHasChannel.call(this, 'twitter');

    this.maxValue = getHighestValueInFunnel(this.data, this.options)

    this.options.funnelSequence.forEach((item, index) => {
      this.funnelData.push({
        label: this.options.labels[index],
        data: this.data[item]
      });
    });

    ////////// Functions //////////

    function checkDataHasChannel(channel) {
      return this.options.funnelSequence.every((item) => {
        return this.data[item][channel];
      });
    }
  }

  getValueScale(value, index) {
    if (value === 0) {
      return 'is-0';
    }

    let scaledValue = Math.ceil(value/this.maxValue * 100)

    return `is-${scaledValue}`;
  }
}

export { FunnelController };

////////// Functions //////////

function getHighestValueInFunnel(data, options) {

  let keys = Object.keys(data);
  let channels = Object.keys(data[keys[0]]);

  let allValues = []

  // gather all values visible in funnels: i.e. all data points, all channels, both periods
  keys.forEach((key) => {
    channels.forEach((channel) => {
      allValues.push(data[key][channel][0]);
      allValues.push(data[key][channel][1]);
    });
  });


  // find largest value
  let largest = allValues.reduce((prev = 0, curr) => {
    if (curr > prev) {
      return curr;
    }

    return prev;
  });

  return largest;
}
