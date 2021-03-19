// @flow weak
const childProcess = require("child_process");

// main loop; selenium main loop;
function runSeleniumTests(options) {
  const {
    local = true,
    environment = "default",
    tests, // for night watch to consume
  } = options;

  function execTests() {
    const child = childProcess.spawn(
      "node",
      [
        //'--inspect-brk',
        "node_modules/.bin/nightwatch",
        "-c",
        local ? "test/nightwatch.local.conf.js" : "test/nightwatch.conf.js",
        "-e",
        environment,
        tests,
      ],
      {
        stdio: [0, 1, 2], // calling-process.stdin: 0, calling-process.stdout:1, calling-process.err:2
      }
    );

    child.on("close", (exitCode) => {
      console.log("closed! exit code:", exitCode);
      process.exit(exitCode);
    });

    child.on("error", (childErr) => {
      console.log(childErr);
    });
  }

  const startRegression = () => {
    console.log(
      "make sure cd regressions/site/; npm install; npm start; localhost:3333\n--------------------------"
    );
    // make sure its' accessible from docker container;
    process.env.SELENIUM_LAUNCH_URL = "http://192.168.1.113:3333";
    execTests();
  };

  startRegression();
}

module.exports = runSeleniumTests;
