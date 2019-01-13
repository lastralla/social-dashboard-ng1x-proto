var fs = require('fs');

// var fileName = 'whatever.js'; // Replace with file

var dataDump;

readMetrics();

function readMetrics() {
  fs.readFile('./engagementDump.json', function read(err, contents) {
    if (err) {
      throw err;
    }

    dataDump = JSON.parse(contents);

    onRead();
  });
}

function onRead() {
  var p0 = dataDump[0].report;
  var p1 = dataDump[1].report;

  var p0MetricNames = [];
  var p1MetricNames = [];

  p0.forEach(function(i) {
    p0MetricNames.push(i.name);
  });
  p1.forEach(function(i) {
    p1MetricNames.push(i.name);
  });

  console.log("Period [0] period:", dataDump[0].period);
  console.log("Period [1] period:", dataDump[1].period);

  console.log("Period [0] report array length:", p0.length);
  console.log("Period [1] report array length:", p1.length);

  console.log("Period [0] report metrics:", p0MetricNames);
  // console.log("Period [1] report metrics:", p1MetricNames);

  // console.log("Unique Period [1] metrics:", findNotInComparisonPeriod());

  // console.log("Period [0], session_duration:", findMetric(p0, 'session_duration') );
  // console.log("Period [1], session_duration:", findMetric(p1, 'session_duration') );

  // console.log("Period [0], bestAds:", findMetric(p0, 'bestAds') );
  // console.log("Period [1], bestAds:", Object.keys(findMetric(p1, 'bestAds')) );


  // console.log("---------- P0 ---------- bestAds.ads length:", findMetric(p0, 'bestAds').ads.length );
  console.log("organicLinkClicks [0]:", findMetric(p0, 'organicLinkClicks') );
  console.log("organicLinkClicks [1]:", findMetric(p1, 'organicLinkClicks') );

  console.log("organicComments [0]:", findMetric(p0, 'organicComments') );
  console.log("organicComments [1]:", findMetric(p1, 'organicComments') );

  console.log("organicShares [0]:", findMetric(p0, 'organicShares') );
  console.log("organicShares [1]:", findMetric(p1, 'organicShares') );

  // console.log("---------- P1 ---------- bestAds.ads length:", findMetric(p1, 'bestAds').ads.length );
  // console.log("bestAds.ads:", findMetric(p1, 'bestAds') );
  // console.log("bestAds.sortByEngagementMetrics:", findMetric(p0, 'bestAds').sortByEngagementMetrics );
  // console.log("bestAds.ads:", findMetric(p1, 'bestAds').ads );

  // console.log("Period [0], engagements:", findMetric(p0, 'engagements') );
  // console.log("Period [1], engagements:", findMetric(p1, 'engagements') );
  // console.log("Period [0], engagements:", findMetric(p0, 'engagements').aggregated.sumAllChannels.breakdownValues );
  // console.log("Period [1], engagements:", findMetric(p1, 'engagements').aggregated.sumAllChannels.breakdownValues );

  // costPerComment, linkClicks, actions
  // console.log("Period [0], actions:", findMetric(p0, 'actions') );
  // console.log("Period [1], actions:", findMetric(p1, 'actions') );
  // console.log("Period [0], actions:", findMetric(p0, 'actions').aggregated.sumAllChannels.breakdownValues );
  // console.log("Period [1], actions:", findMetric(p1, 'actions').aggregated.sumAllChannels.breakdownValues );

  // console.log("Period [0], costPerClick:", findMetric(p0, 'costPerClick') );
  // console.log("Period [1], costPerClick:", findMetric(p1, 'costPerClick') );
  // console.log("Period [0], costPerClick:", findMetric(p0, 'costPerClick').aggregated.sumAllChannels.breakdownValues );
  // console.log("Period [1], costPerClick:", findMetric(p1, 'costPerClick').aggregated.sumAllChannels.breakdownValues );

  // console.log("Period [0], isMyLink:", findMetric(p0, 'isMyLink').aggregated );
  // console.log("Period [1], isMyLink:", findMetric(p1, 'isMyLink') );
  // console.log("Period [0], isMyLink:", findMetric(p0, 'isMyLink').aggregated.sumAllChannels.breakdownValues );
  // console.log("Period [1], isMyLink:", findMetric(p1, 'isMyLink').aggregated.sumAllChannels.breakdownValues );
  // console.log("Period [0], isMyLink:", findMetric(p0, 'isMyLink').aggregated.sumAllChannels.breakdownValues.length );
  // console.log("Period [1], isMyLink:", findMetric(p1, 'isMyLink').aggregated.sumAllChannels.breakdownValues.length );

  function findNotInComparisonPeriod() {
    var unique = [];

    p1MetricNames.forEach(function(i) {
      if (p0MetricNames.indexOf(i) == -1) {
        unique.push(i);
      }
    });

    return unique;
  }

  function findMetric(reportMetrics, key) {
    return reportMetrics.find(function(i) {
      return i.name === key;
    }) || '------------------ Missing: ' + key + ' metric ------------------';
  }
}

