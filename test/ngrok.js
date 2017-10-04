const ngrok = require('ngrok');

ngrok.connect(8080, (err, url) => {
    if (err) {
        throw err;
    } else {
        console.log(`Connected to ${url}. Now testing...`);
        // you are able to mark around with url here;
    }
});