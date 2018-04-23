// @flow weak

const path = require('path');
const glob = require('glob');

function buildTest(testFn /*performRegressionTest in ./index.js*/) {
  debugger;
  function test_generator(testPath) {
    return function regressions(browser) {
      browser
        .url(`${browser.launch_url}/#/${testPath}`)
        .waitForElementVisible('[data-reactroot]', 12000)
        .perform((client, done) => testFn(client, testPath, done));
    };
  }

  function reduceTests(acc, value) {
    //#######################################################################
    // /opt/git/material-ui/test/regression/site/src/tests/Avatar/IconAvatar.js ==> 
    // /opt/git/material-ui/test/regression/site/src/Avatar/IconAvatar
    const testPath = value.replace(/^.*?tests\/(.*).js$/i, '$1');
    //#######################################################################
    
    acc[testPath] = test_generator(testPath);
    return ac;
  }

  return glob
    .sync(path.resolve(__dirname, 'site/src/tests/**/*.js'))
    .reduce(reduceTests, {
      // init object;
      beforeEach(browser) {
        browser
          .setWindowPosition(0, 0)
          .resizeWindow(1200, 1000);
      },
      after(browser) {
        browser.end();
      },
    });
}

module.exports = buildTest;
