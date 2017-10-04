// @flow weak

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
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
        loaders: ['babel'],
      },
      {
        test: /\.svg$/,
        loader: 'file',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file!img',
      },
      {
        test: /\.md$/,
        loader: 'raw',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../../docs'),
      'material-ui': path.resolve(__dirname, '../../src'),
    },
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(),  //==========> when running from test:e2e, got error:  ChunkRenderError: No template for dependency: TemplateArgumentDependency
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ProgressBarPlugin({
      format: ' building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    function onDonePlugin()
    {
        this.plugin("done", function(stats)
        {
            if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
            {
                console.log(stats.compilation.errors);
                process.exit(1); // or throw new Error('webpack build failed.');
            }
            // ...
        });
    }
  ],
  // bail: true, // this takes presidence over onDonePlugin above;
};

