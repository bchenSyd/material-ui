
module.exports = {
  '@tags': ['Dialog', 'Modal', 'Backdrop'],
  'Alert Dialog': function AlertDialog(browser) {
    browser
      .maximizeWindow()
      .url(`${browser.launch_url}/#/component-demos/dialogs`)
      .waitForElementVisible('[data-reactroot]', 12000) // an element that has attribute "data-reactroot";
      // selenium css selectors, see https://saucelabs.com/resources/articles/selenium-tips-css-selectors
      .assert.visible('button[class*="Button-root"]') // *= Match a substring 
      .assert.visible('a[href$="app-bar"]') // $= Match a suffix
      .assert.visible('button[class^="ButtonBase"]') // ^= Match a prefix
      .assert.elementNotPresent('[data-mui-test="Modal"]')
      .assert.visible('a[class*=Home-button]')
      .waitForElementVisible('[data-mui-test="Modal"]', 10000)
      .pause(500)
      .assert.elementPresent('[data-mui-test="Dialog"]')
      .assert.visible('[data-mui-test="Dialog"]')
      .getElementSize('[data-mui-test="Dialog"]', function (result) {
        this.assert.equal(result.value.width, 400);
      })
      .assert.visible('[data-mui-test="Backdrop"]')
      .moveToElement('[data-mui-test="DialogActions"] button:first-child', 40, 15)
      .pause(300)
      .click('[data-mui-test="DialogActions"] button:first-child')
      .waitForElementNotPresent('[data-mui-test="Modal"]', 12000)
      .assert.elementNotPresent('[data-mui-test="Dialog"]')
      .assert.elementNotPresent('[data-mui-test="Backdrop"]')
      .end();
  },
};
