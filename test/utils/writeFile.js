var path = require('path');
var fs = require('fs');

function printFile(fileName, value) {

    fs.writeFile(path.join(__dirname, fileName), JSON.stringify(value), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file " + fileName + "  has been saved!");
    });
}

module.exports = printFile;