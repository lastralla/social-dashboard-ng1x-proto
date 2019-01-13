import angular from 'angular';

angular
  .module('sdApp.reporting')
  .config(configReportingStrings);

////////// Functions //////////

/* @ngInject */
function configReportingStrings($translateProvider) {
  $translateProvider.translations('en', getEnStrings());
}

function getEnStrings() {
  return {
    i18n: {
      reporting: {
        name: 'Reports',
        navLabel: 'Measure',
        noResults: 'No results',
        dataUnavailable: 'Data not available.',
        linkGaCTA: 'Link a Google Analytics account for more insights.',
        errors: {
          invalidDate: 'Could not load report for that date.',
          cannotLoadReport: 'There was an error loading the report.'
        },
        dateSelector: {
          selectYear: 'Select year',
          selectMonth: 'Select a month',
          reset: 'Reset',
          apply: 'Apply',
          comparedTo: 'Comparing to'
        },
        filters: {
          filterBy: 'Filter by:',
          noFiltersAvailable: 'No filters to apply.',
          all: 'All Channels',
          channels: 'Channels',
          competitors: 'Competitors'
        },
        titles: {
          insight: 'Insight',
          bestAds: 'Best Ads',

          /* Conversions */
          conversionsOverview: 'Conversions Overview',
          adConversions: 'Ad Conversions',

          /* Referrals */

          /* Engagement */
          adsEngagement: 'Ads Engagement',
          adsEngagementFunnel: 'Ads Engagement Funnel'

          /* Community */
        },
        headings: {
          channel: 'Channel'
        },
        nav: {
          overview: 'Overview',

          /* Conversions */
          conversions: 'Conversions',
          adsConversion: 'Ads Conversion',
          adsROI: 'Ads Return on Investment',
          gaConversions: 'Google Analytics Conversions',

          /* Referrals */
          referrals: 'Referrals',
          bestAds: 'Best Ads',
          bestPosts: 'Best Posts',
          adWebClicks: 'Ad Website Clicks',
          gaWebSessions: 'GA Web Sessions',

          /* Engagement */
          engagement: 'Engagement',
          adsEngagement: 'Ads Engagement',
          organicEngagement: 'Organic Engagement',
          timing: 'Timing',

          /* Community */
          community: 'Community',
          adsCommunity: 'Ads Community',
          demographics: 'Demographics'
        }
      }
    }
  };
}
