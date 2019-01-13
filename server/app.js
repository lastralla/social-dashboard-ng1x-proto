/*jshint node:true*/

'use strict';

let environment = process.env.NODE_ENV || 'development';
let host = process.env.HOST || 'localhost';
let port = process.env.PORT || 8001;
let bsyncPort = 9000;

let express = require('express');
let app = express();
let path = require('path');

let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let logger = require('morgan');
let four0four = require('./utils/404')();
let browserSync = require('browser-sync').create();

let bsyncConfig;

switch (environment) {
  case 'production':
    // BrowserSync simulating prod environment
    // bsyncConfig = {
    //   port: bsyncPort,
    //   proxy: {
    //     target: `${host}:${port}`
    //   }
    // };
    break;

  default:
    // BrowserSync dev environment
    let webpackDevMiddleware = require('webpack-dev-middleware');
    let webpackHotMiddleware = require('webpack-hot-middleware');

    let webpack = require('webpack');
    let webpackDevConfig = require('../webpack.dev.config');
    let webpackInstance = webpack(webpackDevConfig);

    bsyncConfig = {
      port: bsyncPort,
      proxy: {
        target: `${host}:${port}`,
        ws: true,
        middleware: [
          webpackDevMiddleware(webpackInstance, {
            publicPath: webpackDevConfig.output.publicPath,
            stats: {
              colors: true
            },
            headers: {
              // https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#no-access-control-allow-origin-header-is-present-on-the-requested-resource
              'Access-Control-Allow-Origin': '*'
            }
            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
          }),
          webpackHotMiddleware(webpackInstance)
        ]
      }
    }
}

app.use(favicon(`${__dirname}/favicon.png`));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));

/* Map assets */
if (environment === 'development') {
  browserSync.init(bsyncConfig);
}

/* Map stubbed api calls */
mapStubApiEndpoints();

/* Map stub authentication calls */
mapStubAuthenticationEndpoints();

switch (environment) {
  case 'production':
    app.use(express.static('./build/'));
    app.use('/**', function(req, res) {
      let filePath = path.join(__dirname, '../build/index.html');
      res.sendFile(filePath);
    });
    break;

  default:
    /* Map source and working files */
    app.use('/**', function(req, res) {
      let filePath = path.join(__dirname, '../src/app/index_dev.html');
      res.sendFile(filePath);
    });
    break;
}

app.listen(port, onStartup);

//////////// Functions ////////////

function mapStubApiEndpoints() {
  app.use('/api/v1', function(req, res) {
    let basePath = '../resources/mock_server/';
    let verb = req.method.toLowerCase();
    let filePath = path.join(__dirname, basePath, req._parsedUrl.pathname, verb + '.json');

    // Hack to switch brands, brand 01 = Doe Inc (default), brand 02 = ACME
    let reportBrand = 'doeinc';
    if (req.query.brand && req.query.brand === '02') {
      reportBrand = 'acme'
    }

    /* Select which set of stub data to use */
    if (req.query.topic && req.query.topic === 'sample') {
      filePath = filePath.replace('report/', 'report/' + reportBrand + '/fake-metrics/');
    } else if (req.query.topic === 'community') {
      filePath = filePath.replace('report/', 'report/' + reportBrand + '/community/');
    } else if (req.query.topic === 'engagement') {
      filePath = filePath.replace('report/', 'report/' + reportBrand + '/engagement/');
    } else if (req.query.topic === 'conversion') {
      filePath = filePath.replace('report/', 'report/' + reportBrand + '/conversion/');
    } else if (req.query.topic === 'referral') {
      filePath = filePath.replace('report/', 'report/' + reportBrand + '/referral/');
    }

    res.sendFile(filePath);
  });
}

function mapStubAuthenticationEndpoints() {
  app.use('/authenticate', function(req, res) {
    let basePath = '../resources/mock_server';
    let filePath = path.join(__dirname, basePath, (req.originalUrl).replace('?', ''), 'mock.json');

    /**
     * This fakes out calls to authentication endpoints.
     */

    /* Simulate authentication error when doing form login */
    if (req.url === '/login') {
      if (req.body.email && req.body.email === 'john@doeinc.com'
          && req.body.password && req.body.password === 'DoeInc') {
        /* authenticated, send back a token */
        res.sendFile(filePath);
        return;
      }
    }

    /* Simulate user already exists error during registration */
    if (req.url === '/register') {
      if (req.body.email && req.body.email === 'existing@gmail.com') {
        res.send(422, 'user.exists');
      }
    }

    /* Otherwise reject everybody */
    res.send(401, 'authentication.error');
  });
}

function onStartup() {
  console.log(`\n******************************************************`);
  console.log(`*************** Express Server Started ***************`);
  console.log(`******************************************************`);
  console.log(`  ==> Serving host:  ${host}`);
  console.log(`  ==> Listening on port:  ${port}`);
  console.log(`  ==> Environment:  ${environment} \n\n`);
}
