/* eslint-disable */
const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || "127.0.0.1";
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444; // 4444 doesn't work on macbook

module.exports = {
  src_folders: [],

  test_settings: {
    default: {
      launch_url: process.env.SELENIUM_LAUNCH_URL,
    },

    selenium: {
      // Selenium Server is running locally and is managed by Nightwatch
      selenium: {
        start_process: false,
        port: 4444,
      },
      webdriver: {
        start_process: false,
      },
    },

    chrome: {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          // https://github.com/nightwatchjs/nightwatch/issues/2617
          w3c: false,
          args: ["--start-maximized"],
        },
      },
    },

    firefox: {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "firefox",
      },
    },

    ie: {
      extends: "selenium",
      desiredCapabilities: {
        browserName: "internet explorer",
      },
    },
  },
};
