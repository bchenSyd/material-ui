/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */

const fs = require('fs');
const path = require('path');
const BlinkDiff = require('blink-diff');
const runTest = require('./runTest');
const screenshotElement = require('./screenshotElement');

function compareScreenshots(client, baselinePath, screenshotPath, done) {
  const diffPath = screenshotPath.replace('.png', '-diff.png');

  const diff = new BlinkDiff({
    imageAPath: baselinePath,
    imageBPath: screenshotPath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.001,
    delta: 20,
    composition: false,
    hideShift: false,
    hShift: 0,
    vShift: 0,
    imageOutputPath: diffPath,
  });

  diff.run((error, result) => {
    if (error) {
      throw error;
    } else {
      const passed = diff.hasPassed(result.code);
      client.assert.strictEqual(passed, true, 'should have passed the diff test');

      if (!passed) {
        console.error('Diff Screenshot:', diffPath);
      }

      /**
       * Could include this... but feels like added noise.
       */
      // const max = Math.ceil(result.dimension * 0.001);
      // client.assert.strictEqual(
      //   result.differences < max,
      //   true,
      //   `should have less than ${max}/${result.dimension} differences,
      //      found ${result.differences}.`
      // );
      done();
    }
  });
}

function performRegressionTest(client, testPath /*Avatar/IconAvat, or Button/flatButton*/, done) {
  client.session(({ value /*browsername, version, platform*/ }) => {
    const profile = `${value.browserName.toLowerCase()}-${
      value.version}-${value.platform.toLowerCase()}`;
    const screenshotPath = path.resolve(__dirname, `screenshots/output/${testPath}/${profile}.png`);
    const baselinePath = path.resolve(__dirname, `screenshots/baseline/${testPath/*Avatar/IconAvat*/}/${profile/*chrome-ver-linux.png*/}.png`);

    // Makes sure the path is visible to the calling process.
    fs.access(baselinePath, fs.F_OK, (err) => {
      client.assert.strictEqual(!err, true, `should have a baseline image: ${baselinePath}`); // if no baseimage created; throw error here (assert)

      //####################################################################################################################]
      if (!err) { // found a base image; 
        client.windowHandle((handle) => {
          client.windowSize(handle.value, (size) => {
            // instruct nightwatch to take sreensot ==> selenium server ==> selenium client take screensot
            // in the case of remote run, will screenshot be passed back??
            return screenshotElement(
              client,
              screenshotPath, /*local screenshot path*/
              size.value,
              () => compareScreenshots(client, baselinePath, screenshotPath, done)
            );
          });
        });
      } else {
        done(); // this is image comparison method passed in;
      }
      //####################################################################################################################
      
    });
  });
}

module.exports = runTest(performRegressionTest);
