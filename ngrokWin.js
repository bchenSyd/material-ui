const ngrok = require('ngrok');
const childProcess = require('child_process');

function TestNgrok() {
    ngrok.connect(8080, (err, url) => {
        if (err) {
            throw err;
        } else {
            console.log(`Connected to ${url}. Now testing...`);
            // you are able to mark around with url here;
        }
    });
}


// const child = childProcess.spawn(
//     './node_modules/.bin/nightwatch',
//     [
//         '-c',
//         'test/nightwatch.conf.js',
//         '-e',
//         'chrome_51',
//         'test/e2e'
//     ],
//     {
//         stdio: [0, 0, 0],
//     });





const child1 = childProcess.spawn('npm.cmd', ['-v'], {stdio: [0,1,2]})
const child2 = childProcess.spawn('.\\node_modules\\.bin\\nightwatch.cmd', ['-v'], {stdio: [0,1,2]})


/*****************************************************************************************************************
 Error: spawn .\node_modules\.bin\nightwatch ENOENT
            at exports._errnoException (util.js:1020:11)
 */
//const child = childProcess.spawn('.\\node_modules\\.bin\\nightwatch', ['-v'], {stdio: [0,1,2]})



/*****************************************************************************************************************
error: '.' is not recognized as an internal or external command,
operable program or batch file.
 */
// const child = childProcess.spawn('./node_modules/.bin/nightwatch.cmd', ['-v'], {stdio: [0,1,2]})