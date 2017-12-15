

Download Selenium Server (localhost:4444)  [here](http://selenium-release.storage.googleapis.com/index.html?path=2.40/)
Download ChromeDriver - download the latest version of the ChromeDriver for your platform from the [Downloads page] (http://chromedriver.storage.googleapis.com/index.html).

>http://nightwatchjs.org/blog/testing-webrtc-apps-with-nightwatch/#adaptingtestsettingsatruntimeperenvironment

## running on windows or linux?
```javascript
// /opt/github/material-ui/test/selenium.js line#35
function execTests() {
    const child = childProcess.spawn(
      './node_modules/.bin/nightwatch', #linux
      '.\\node_modules\\.bin\\nightwatch.cmd', #windows

yarn add --dev selenium-standalone
yarn selenium-standalone install
```

## cd docs/site&& npm install

## yarn selenium-standalone install

## yarn run test:e2e:local

## how does nightwatch works?

```javascript
// nightwatch.local.config.js

  "selenium": {
    "start_process": true,
    // "server_path": "./test/bin/selenium-server-standalone-2.40.0.jar",
    "server_path": "node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar",
    "log_path": "",
    "cli_args": {
      // "webdriver.chrome.driver": "./test/bin/chromedriver.exe",
      "webdriver.chrome.driver": "node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver"
    },
  }


// start nightwatch

      const child = childProcess.spawn(
      'node',
      [
        '--inspect-brk',
        'node_modules/nightwatch/bin/runner.js',
        '-c',  // this is argv.config
        'test/nightwatch.local.conf.js',  // require(this.argv.config)
        '-e',
        'chrome',
        'test/e2e',
      ],

// node_modules/nightwatch/lib/runner/cli/cli.js  #81
    // $ nightwatch -c
    // $ nightwatch --config
    var opt = require('optimist');

    ...

    this.command('config')  // #81
      .demand(true)
      .description('Path to configuration file')
      .alias('c')
      .defaults('./nightwatch.json');
// node_modules/nightwatch/lib/runner/cli/clirunner.js #87
    // reading the settings file
    try {
      this.settings = require(this.argv.config);  // we are reading the config file passed to nightwatch;
      this.replaceEnvVariables(this.settings);
      this.replaceEnvVariables(this.settings);

      this.manageSelenium = !this.isParallelMode() && this.settings.selenium &&
      this.settings.selenium.start_process || false;
      //  debugSelenium.js  

      // childprocess.spawn('java',
      // [  '-Dwebdriver.chrome.driver=node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver',
      //    '-jar',
      //    'node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar',
      //    '-port',
      //    12345 ],     
      //   { stdio: [0, 1, 2] } )
      Selenium.start();
    }
```