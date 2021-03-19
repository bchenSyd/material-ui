// @flow weak

const pngCrop = require("png-crop");
module.exports = function screenshotElement(
  client,
  screenshotPath,
  windowSize,
  callback
) {
  client.element(
    "css selector",
    "[data-reactroot] > *:first-child", //always take the root element (first element under [data-reactroot])
    (element) => {
      debugger;
      client.elementIdLocationInView(element.value.ELEMENT, (
        location /*element location in browser*/
      ) => {
        client.elementIdSize(element.value.ELEMENT, (size) => {
          //we git the element size;
          client.saveScreenshot(screenshotPath, () => {
            const cropWidth = size.value.width < windowSize.width - 30;
            const cropHeight = size.value.height < windowSize.height - 30;

            if (cropWidth || cropHeight) {
              // a tiny element in a big window, don't capture the entire window
              const config = {
                height: cropHeight
                  ? size.value.height + 30 /*caputer 30pix more*/
                  : windowSize.height,
                width: cropWidth ? size.value.width + 30 : windowSize.width,
                top:
                  cropHeight && location.value.y >= 15
                    ? location.value.y - 15 // if the element is at bottom, capture 30 pixs more and make it at center;
                    : location.value.y, // if the element is at top, capture 30 pixs more starting from elemenet's location;
                left:
                  cropWidth && location.value.x >= 15
                    ? location.value.x - 15
                    : location.value.x,
              };
              // save screenshot to path paratmeter;
              pngCrop.crop(screenshotPath, screenshotPath, config, (err) => {
                if (err) {
                  throw err;
                }
                callback();
              });
            } else {
              // take a screenshot for entire browser window;
              callback();
            }
          });
        });
      });
    }
  );
};
