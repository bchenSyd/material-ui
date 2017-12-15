

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

## yarn run test:e2e:local
```bash
#step 1:
npm install 
cd docs/site&& npm install
yarn selenium-standalone install
```

## config selenium-standalone (should be already configured)
```json
  "selenium": {
    "start_process": true,
    // "server_path": "./test/bin/selenium-server-standalone-2.40.0.jar",
    "server_path": "node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar",
    "log_path": "",
    "cli_args": {
      // "webdriver.chrome.driver": "./test/bin/chromedriver.exe",
      "webdriver.chrome.driver": "node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver"
    },
  },
```