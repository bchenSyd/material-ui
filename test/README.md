

Download Selenium Server (localhost:4444)  [here](http://selenium-release.storage.googleapis.com/index.html?path=2.40/)
Download ChromeDriver - download the latest version of the ChromeDriver for your platform from the [Downloads page] (http://chromedriver.storage.googleapis.com/index.html).

>http://nightwatchjs.org/blog/testing-webrtc-apps-with-nightwatch/#adaptingtestsettingsatruntimeperenvironment
```
"selenium" : {
    "start_process" : true,
    "server_path" : "./bin/selenium-server-standalone-2.43.1.jar",
    "log_path" : "",
    "cli_args" : {
      "webdriver.chrome.driver" : "bin/chromedriver"
    }
  },
```