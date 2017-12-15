/* eslint-disable */
var childProcess = require('child_process');

cliOptions = ["-Dwebdriver.chrome.driver=node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver",
    "-jar",
    "node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar",
    "-port", 4444];


childProcess.spawn('java',
    cliOptions,
    { stdio: [0, 1, 2] });


// open PostMan and post to  http://localhost:4444/wd/hub/session
// {
//     "desiredCapabilities": {
//       "browserName": "chrome",
//       "javascriptEnabled": true,
//       "acceptSslCerts": true,
//       "platform": "ANY",
//       "chromeOptions": {
//         "args": [
//           "--start-maximized"
//         ]
//       },
//       "name": "Dialogs"
//     }
//   }