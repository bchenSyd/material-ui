// @flow weak
const path = require('path');
const runSeleniumTests = require('./selenium');

function runRegressionsTests(options = {}) {
  const { createBaseline, ...other } = options;
  return runSeleniumTests({
    serverRoot: path.resolve(__dirname, 'regressions/site'),
    tests: createBaseline ? 'test/regressions/createBaseline.js' : 'test/regressions/index.js',
    ...other,
  });
}

module.exports = runRegressionsTests;
