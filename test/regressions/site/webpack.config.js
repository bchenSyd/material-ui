/* eslint-disable no-console */
// @flow weak

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV;
console.log(`********** webpack env=${JSON.stringify(env)} *********`);
const production = env === "production";

const config = {
  mode: production ? "production" : "development",
  devtool: production ? "" : "cheap-module-source-map",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "../public"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // required when run from wds cli
    new CopyWebpackPlugin({
      patterns: [path.resolve(__dirname, "./index.html")],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-export-default-from",
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "material-ui": path.resolve(__dirname, "../../../src"),
    },
  },
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 3333,
    historyApiFallback: true,
    hot: true,
  },
};
module.exports = config;
