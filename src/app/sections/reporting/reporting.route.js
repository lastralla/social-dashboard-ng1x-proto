import angular from 'angular';

/* Conversion Report Controllers */
import { ConversionOverviewController } from './routes/conversion/overview/ConversionOverviewController.js'; /* jscs:disable maximumLineLength */
import { ConversionAdsController } from './routes/conversion/conversionAds/ConversionAdsController.js'; /* jscs:disable maximumLineLength */
import { AdsRoiController } from './routes/conversion/adsRoi/AdsRoiController.js'; /* jscs:disable maximumLineLength */
import { GaConversionsController } from './routes/conversion/gaConversions/GaConversionsController.js'; /* jscs:disable maximumLineLength */

/* Referral Report Controllers */
import { ReferralOverviewController } from './routes/referral/overview/ReferralOverviewController.js'; /* jscs:disable maximumLineLength */
import { AdWebsiteClicksController } from './routes/referral/adWebsiteClicks/AdWebsiteClicksController.js'; /* jscs:disable maximumLineLength */
import { WebSessionsController } from './routes/referral/webSessions/WebSessionsController.js'; /* jscs:disable maximumLineLength */

/* Community Report Controllers */
import { CommunityOverviewController } from './routes/community/overview/CommunityOverviewController.js'; /* jscs:disable maximumLineLength */
import { AdsCommunityController } from './routes/community/adsCommunity/AdsCommunityController.js'; /* jscs:disable maximumLineLength */

/* Engagement Report Controllers */
import { EngagementOverviewController } from './routes/engagement/overview/EngagementOverviewController.js'; /* jscs:disable maximumLineLength */
import { AdsEngagementController } from './routes/engagement/adsEngagement/AdsEngagementController.js'; /* jscs:disable maximumLineLength */
import { OrganicEngagementController } from './routes/engagement/organicEngagement/OrganicEngagementController.js'; /* jscs:disable maximumLineLength */

/* Sample Report Controllers */
import { SampleController } from './routes/sample/SampleController.js';
import { OverviewController } from './routes/sample/OverviewController.js';
import { BadTopicController } from './routes/sample/BadTopicController.js';

let baseTitle = 'Report';

angular
  .module('sdApp.reporting')
  .run(reportingModuleRun);

////////// Functions //////////

/* @ngInject */
function reportingModuleRun(routerHelper) {
  routerHelper.configureStates(getURLMappings());
}

function getURLMappings() {
  let allStates = [{
    state: 'reporting',
    config: {
      abstract: true,
      url: '/reporting',
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          template: '<div ui-view="subNavigation"></div>'
        }
      },
      data: {
        navContext: [
          'authenticated'
        ]
      }
    }
  }];

  addToAllStates(getBaseStates());
  addToAllStates(getConversionStates());
  addToAllStates(getReferralStates());
  addToAllStates(getCommunityStates());
  addToAllStates(getEngagementStates());
  // addToAllStates(getSampleStates());

  return allStates;

  ////////// Functions //////////

  function addToAllStates(states) {
    states.forEach((state) => {
      allStates.push(state);
    });
  }
}

function getBaseStates() {
  return [{
    state: 'reporting.root',
    config: {
      url: '/',
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          template: ''
        }
      },
      data: {
        topLevelNav: {
          order: 5,
          label: 'reporting'
        }
      }
    }
  }];
}

function getConversionStates() {
  return [{
    state: 'reporting.conversion',
    config: {
      url: '/conversion',
      abstract: true,
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          templateUrl: require('./components/sd-reporting-nav/conversionNav.html')
        }
      }
    }
  }, {
    state: 'reporting.conversion.overview',
    config: {
      url: '',
      views: {
        '': {
          controller: ConversionOverviewController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/conversion/overview/conversionOverview.html')
        }
      },
      title: `Conversion Overview`
    }
  }, {
    state: 'reporting.conversion.adsConversion',
    config: {
      url: '/ads-conversion',
      views: {
        '': {
          controller: ConversionAdsController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/conversion/conversionAds/conversionAds.html')
        }
      },
      title: `Ads Conversion ${baseTitle}`
    }
  }, {
    state: 'reporting.conversion.adsROI',
    config: {
      url: '/ads-roi',
      views: {
        '': {
          controller: AdsRoiController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/conversion/adsRoi/adsRoi.html')
        }
      },
      title: `Ads ROI ${baseTitle}`
    }
  }, {
    state: 'reporting.conversion.gaConversions',
    config: {
      url: '/ga-conversions',
      views: {
        '': {
          controller: GaConversionsController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/conversion/gaConversions/gaConversions.html')
        }
      },
      title: `Google Analytics Conversions ${baseTitle}`
    }
  }];
}

function getReferralStates() {
  return [{
    state: 'reporting.referral',
    config: {
      url: '/referral',
      abstract: true,
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          templateUrl: require('./components/sd-reporting-nav/referralNav.html')
        }
      }
    }
  }, {
    state: 'reporting.referral.overview',
    config: {
      url: '',
      views: {
        '': {
          controller: ReferralOverviewController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/referral/overview/referralOverview.html')
        }
      },
      title: `Referral Overview`
    }
  }, {
    state: 'reporting.referral.adWebsiteClicks',
    config: {
      url: '/ad-website-clicks',
      views: {
        '': {
          controller: AdWebsiteClicksController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/referral/adWebsiteClicks/adWebsiteClicks.html')
        }
      },
      title: `Ad Website Clicks ${baseTitle}`
    }
  }, {
    state: 'reporting.referral.webSessions',
    config: {
      url: '/web-sessions',
      views: {
        '': {
          controller: WebSessionsController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/referral/webSessions/webSessions.html')
        }
      },
      title: `GA Web Sessions ${baseTitle}`
    }
  }];
}

function getCommunityStates() {
  return [{
    state: 'reporting.community',
    config: {
      url: '/community',
      abstract: true,
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          templateUrl: require('./components/sd-reporting-nav/communityNav.html')
        }
      }
    }
  }, {
    state: 'reporting.community.overview',
    config: {
      url: '',
      views: {
        '': {
          controller: CommunityOverviewController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/community/overview/communityOverview.html')
        }
      },
      title: `Community Overview`
    }
  }, {
    state: 'reporting.community.adsCommunity',
    config: {
      url: '/ads-community',
      views: {
        '': {
          controller: AdsCommunityController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/community/adsCommunity/adsCommunity.html')
        }
      },
      title: `Ads Community ${baseTitle}`
    }
  }];
}

function getEngagementStates() {
  return [{
    state: 'reporting.engagement',
    config: {
      url: '/engagement',
      abstract: true,
      views: {
        '': {
          template: '<ui-view/>'
        },
        'subNavigation': {
          templateUrl: require('./components/sd-reporting-nav/engagementNav.html')
        }
      },
      title: `Engagement Overview`
    }
  }, {
    state: 'reporting.engagement.overview',
    config: {
      url: '',
      views: {
        '': {
          controller: EngagementOverviewController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/engagement/overview/engagementOverview.html')
        }
      },
      title: `Engagement Overview ${baseTitle}`
    }
  }, {
    state: 'reporting.engagement.adsEngagement',
    config: {
      url: '/ads-engagement',
      views: {
        '': {
          controller: AdsEngagementController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/engagement/adsEngagement/adsEngagement.html')
        }
      },
      title: `Ads Engagement ${baseTitle}`
    }
  }, {
    state: 'reporting.engagement.organicEngagement',
    config: {
      url: '/organic-engagement',
      views: {
        '': {
          controller: OrganicEngagementController,
          controllerAs: '$ctrl',
          templateUrl: require('./routes/engagement/organicEngagement/organicEngagement.html')
        }
      },
      title: `Organic Engagement ${baseTitle}`
    }
  }];
}

// function getSampleStates() {
//   return [{
//     state: 'reporting.root',
//     config: {
//       url: '/',
//       views: {
//         '': {
//           controller: OverviewController,
//           controllerAs: '$ctrl',
//           templateUrl: require('./routes/sample/overview.html')
//         }
//       },
//       title: 'Sample Overview',
//       data: {
//         topLevelNav: {
//           order: 5,
//           label: 'reporting'
//         }
//       }
//     }
//   }, {
//     state: 'reporting.sample',
//     config: {
//       url: '/sample',
//       views: {
//         '': {
//           controller: SampleController,
//           controllerAs: '$ctrl',
//           templateUrl: require('./routes/sample/sample.html')
//         }
//       },
//       title: 'Sample Report'
//     }
//   }, {
//     state: 'reporting.bad', // Report with invalid topic in API request
//     config: {
//       url: '/bad-topic',
//       views: {
//         '': {
//           controller: BadTopicController,
//           controllerAs: '$ctrl',
//           templateUrl: require('./routes/sample/sample.html')
//         }
//       },
//       title: 'Invalid'
//     }
//   }];
// }
