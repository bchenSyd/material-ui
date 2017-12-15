/* eslint-disable no-console,flowtype/require-valid-file-annotation */

const childProcess = require('child_process');
const ngrok = require('ngrok');
const webpack = require('webpack');
const httpServer = require('http-server');
const writeFile = require('./utils/writeFile');

function runSeleniumTests(options) {
  const {
    local = false,
    environment = 'chrome',
    tests = 'test/e2e',
    webpackConfig,
    serverRoot,
  } = options;
  const compiler = webpack(webpackConfig);

  const server = httpServer.createServer({ root: serverRoot });

  function initLocalTunnel(cb) {
    // https://stackoverflow.com/a/45494621
    // https://ngrok.com/docs#config
    // When forwarding to a local port, ngrok does not modify the tunneled HTTP requests at all, 
    // they are copied to your server byte-for-byte as they are received. 
    // Some application servers like WAMP, MAMP and pow use the Host header for determining which development site to display. 
    // For this reason, ngrok can rewrite your requests with a modified Host header.
    //  Use the -host-header switch to rewrite incoming HTTP requests.
    // If rewrite is specified, the Host header will be rewritten to match the hostname portion of the forwarding address. 
    // Any other value will cause the Host header to be rewritten to that value.
    ngrok.connect({
      addr: 8080,
      host_header: "rewrite",
    }, (err, url) => {
      if (err) {
        throw err;
      } else {
        process.env.SELENIUM_LAUNCH_URL = url;
        console.log(`Connected to ${url} (proxy to http://locahost:8080)`);
        cb();
      }
    });
  }

  function execTests() {
    const child = childProcess.spawn(
      './node_modules/.bin/nightwatch',
      [
        '-c',
        local ? 'test/nightwatch.local.conf.js' : 'test/nightwatch.conf.js',
        '-e',
        environment,
        tests,
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

  function bootServer() {
    console.log('Booting HTTP server');

    server.listen(8080, () => {
      console.log('Server listening on port 8080\n--------------------------');

      childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
        process.env.MUI_HASH = stdout;
        initLocalTunnel(execTests);
      });
    });
  }

  function kickStart() {
    // you go to docs/site and run `yarn start` yourself so that http://localhost:8080 is up;
    console.log('Server listening on port 8080\n--------------------------');

    childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
      process.env.MUI_HASH = stdout;
      initLocalTunnel(execTests);
    });
  }

  function cleanUp() {
    ngrok.disconnect();
    ngrok.kill();
    server.close(() => {
      console.log('Shut down server.');
    });
  }

  function buildSite() {
    writeFile('webpack.config.json', webpackConfig);

    compiler.run((err) => {
      if (err) {
        throw err;
      }
      bootServer();
    });
  }

  // use buildSite() if you want to build site and run it everytime;
  // use kickStart() after you run `cd docs/site && yarn start` so that you can run test directly;
  // buildSite();
   kickStart();
  //initLocalTunnel(require('lodash').noop)
    
  process.on('exit', cleanUp);
  process.on('SIGINT', cleanUp);
  process.on('uncaughtException', cleanUp);
}

module.exports = runSeleniumTests;
