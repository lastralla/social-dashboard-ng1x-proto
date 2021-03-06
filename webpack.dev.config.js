/*jshint node:true*/

'use strict';

let webpack = require('webpack');
let path = require('path');

let port = 9000; // TODO read from env

let projectRoot = './';
let srcFolder = 'src';
let appFolder = 'app';
let fontFolder = 'fonts/';
let imgFolder = `${projectRoot}/assets/images/`;

let BrowserSyncPlugin = require('browser-sync-webpack-plugin');    // https://github.com/Va1/browser-sync-webpack-plugin
let HtmlWebpackPlugin = require('html-webpack-plugin');            // https://github.com/ampedandwired/html-webpack-plugin

module.exports = {
  context: `${__dirname}/${srcFolder}`,
  devtool: '#source-map',                       // Warning: https://github.com/jlongster/monkey-hot-loader/issues/3

  entry: [
    `webpack/hot/dev-server?//localhost:${port}/app/`,
    'webpack-hot-middleware/client',
    './app/app.module'
  ],

  output: {
    sourceMapFilename: 'sourcemap.json',
    path: path.join(__dirname, 'app'),
    publicPath: `//localhost:${port}/app/`,
    filename: 'app.js'
  },

  watch: true,

  module: {

    preLoaders: [{
    //   test: /\.scss$/,
    //   loader: 'stylelint'
    // }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs!jshint'
    }],

    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'monkey-hot',
        'ng-annotate',
        'babel?cacheDirectory&presets[]=es2015'
      ]
    }, {
      test: /\.css$/,                                  // Note: this is for font-awesome
      loader: 'style!css'                              // Note: omitting sourceMap flag, font-awesome does not seem to like it
    }, {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!sass?sourceMap'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: `url-loader?limit=10000&name=${fontFolder}[hash].[ext]&mimetype=application/font-woff`
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: `file-loader?name=${fontFolder}[hash].[ext]`
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=' + imgFolder + '[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
          // loaders: [
          //   'file?hash=sha512&digest=hex&name=' + imgFolder + '[hash].[ext]',
          //   'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          // ]
    }, {
      test: /\.html$/,
      exclude: [
        /index_dev\.html$/,
        /index_tmpl\.html$/
      ],
      loader: `ngtemplate?relativeTo=${srcFolder}/${appFolder}!html`
    }]
  },

  // stylelint: {
  //   configFile: path.join(__dirname, projectRoot, '.stylelintrc')
  // },

  plugins: [
    new HtmlWebpackPlugin({                                    // https://github.com/ampedandwired/html-webpack-plugin
      template: './app/index_tmpl.html',
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()                       // https://github.com/webpack/webpack/issues/1151
  ]
};
