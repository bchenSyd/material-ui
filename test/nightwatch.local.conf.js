/* eslint-disable */
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
//const geckodriver = require('geckodriver');
const phantomjs = require('phantomjs-prebuilt');

const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || '127.0.0.1';
// https://github.com/nightwatchjs/nightwatch/issues/1673
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444; // 4444 doesn't work on macbook

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'test/reports',
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: true ,
    server_path: seleniumServer.path,
    log_path: "test/e2e-log",
    host: SELENIUM_HOST,
    port: SELENIUM_PORT
  },
  test_settings: {
    default: {
      launch_url: process.env.SELENIUM_LAUNCH_URL, // http://localhost:8080
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,  // tell nightwatch to connect to selenium #port
      desiredCapabilities : {
        browserName : "phantomjs",
        javascriptEnabled : true,
        acceptSslCerts : true,
        'phantomjs.binary.path': phantomjs.path
      }
    },
    // chrome: {
    //   desiredCapabilities: {
    //     browserName: 'chrome',
    //     chromeOptions: {
    //       args: ['--start-maximized'],
    //     },
    //     javascriptEnabled: true,
    //     acceptSslCerts: true
    //   },
    //   selenium: {
    //     cli_args: {
    //       'webdriver.chrome.driver': chromedriver.path,
    //     }
    //   }
    // },
    // firefox: {
    //   desiredCapabilities: {
    //     browserName: 'firefox',
    //     javascriptEnabled: true,
    //     marionette: true
    //   },
    //   selenium: {
    //     cli_args: {
    //       'webdriver.gecko.driver': geckodriver.path
    //     }
    //   }
    // }
  },
};
