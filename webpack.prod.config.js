/*jshint node:true*/

'use strict';

let webpack = require('webpack');
let path = require('path');

let projectRoot = './';
let srcFolder = 'src';
let appFolder = 'app';
let fontFolder = 'fonts/';
let imgFolder = 'images/';

let HtmlWebpackPlugin = require('html-webpack-plugin');            // https://github.com/ampedandwired/html-webpack-plugin

module.exports = {
  context: __dirname,

  devtool: null,

  entry: [
    './src/app/app.module'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },

  watch: false,

  module: {

    preLoaders: [{
    //   test: /\.scss$/,
    //   loader: 'css-loader!stylelint'
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
        'ng-annotate',
        'babel?cacheDirectory&presets[]=es2015'
      ]
    }, {
      test: /\.css$/,                                  // Note: this is for font-awesome
      loader: 'style!css'                              // Note: omitting sourceMap flag, font-awesome does not seem to like it
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
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
    new HtmlWebpackPlugin({
      template: './src/app/index_tmpl.html',
      hash: true,
      favicon: './server/favicon.png'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      mangle: false,
      sourcemap: false
    })
  ]
};
