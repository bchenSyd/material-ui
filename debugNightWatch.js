//###################################################################################################

                        // main loop is at test/selenium.js
                        // uncomment --inspect-brk will start debugging nightwatch

//###################################################################################################






























/* eslint-disable */
var childProcess = require('child_process');

// cliOptions=["-Dwebdriver.chrome.driver=node_modules/selenium-standalone/.selenium/chromedriver/2.33-x64-chromedriver",
// "-jar",
// "node_modules/selenium-standalone/.selenium/selenium-server/3.7.1-server.jar",
// "-port",4444];


// childProcess.spawn('java', cliOptions,
//     {stdio: [0,1,2]});


// open PostMan and post
// localhost:4444/wd/hub/session
// {"desiredCapabilities":{"browserName":"chrome","javascriptEnabled":true,"acceptSslCerts":true,"platform":"ANY","chromeOptions":{"args":["--start-maximized"]},"name":"Dialogs"}}




function execTests() {
    const child = childProcess.spawn(
      'node',
      [
        '--inspect-brk',
        'node_modules/nightwatch/bin/runner.js',
        '-c',
        'test/nightwatch.local.conf.js',
        '-e',
        'chrome',
        'test/e2e', // nightwatch alow you to pass tests
      ],
      {
        stdio: [0, 1, 2], //calling-process.stdin: 0, calling-process.stdout:1, calling-process.err:2
      },
    );

    child.on('close', (exitCode) => {
      console.log('closed! exit code:', exitCode);
      process.exit(exitCode);
    });

    child.on('error', (childErr) => {
      console.log(childErr);
     // throw childErr;
    });
  }


  execTests();