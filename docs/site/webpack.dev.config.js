// @flow weak

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
  debug: true,
  bail: true,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname),
  entry: {
    main: [      
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader!img-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../../docs'),
      'material-ui': path.resolve(__dirname, '../../src'),
    },
  },
  progress: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format: ' building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
  ],
};
