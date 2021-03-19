/* eslint-disable */
const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || "127.0.0.1";
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444; // 4444 doesn't work on macbook

module.exports = {
  output_folder: "test/reports",
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: false,
    host: SELENIUM_HOST,
    port: SELENIUM_PORT,
  },
  test_settings: {
    default: {
      // must be accessible from docker container
      // ifconfig to work out your local ip address for docker container (default bridge)
      launch_url: process.env.SELENIUM_LAUNCH_URL,
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--start-maximized"],
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
        javascriptEnabled: true,
        marionette: true,
      },
    },
  },
};
