/* eslint-disable flowtype/require-valid-file-annotation */

const SELENIUM_HOST = process.env.SELENIUM_LOCAL_HOST || '127.0.0.1';
const SELENIUM_PORT = process.env.SELENIUM_LOCAL_PORT || 4444;

module.exports = {
  output_folder: 'test/selenium-output',
  selenium: {
    start_process: true,
    server_path: './test/bin/selenium-server-standalone-2.40.0.jar',
    log_path: '',
    cli_args: {
      'webdriver.chrome.driver': './test/bin/chromedriver.exe',
    },
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:8080',//process.env.SELENIUM_LAUNCH_URL,
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
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
