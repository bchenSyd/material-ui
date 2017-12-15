/* eslint-disable flowtype/require-valid-file-annotation */

const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || '127.0.0.1';
// https://github.com/nightwatchjs/nightwatch/issues/1673
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444; // 4444 doesn't work on macbook

module.exports = {
  output_folder: 'test/selenium-output',
  "selenium": {
    "start_process": true,
    // "server_path": "./test/bin/selenium-server-standalone-2.40.0.jar",
    "server_path": "node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar",
    "log_path": "",
    "port":SELENIUM_PORT, // tell selenium to listen on #port;
    "cli_args": {
      // "webdriver.chrome.driver": "./test/bin/chromedriver.exe",
      "webdriver.chrome.driver": "node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver"
    },
  },
  test_settings: {
    default: {
      launch_url: process.env.SELENIUM_LAUNCH_URL,
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,  // tell nightwatch to connect to selenium #port
      silent: true,
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  },
};
