
module.exports = {
  '@tags': ['Dialog', 'Modal', 'Backdrop'],
  'Alert Dialog': function AlertDialog(browser) {
    browser
      .maximizeWindow()
      .url(`${browser.launch_url}/#/component-demos/dialogs`)
      .waitForElementVisible('[data-reactroot]', 12000) // an element that has attribute "data-reactroot";
      // selenium css selectors, see https://saucelabs.com/resources/articles/selenium-tips-css-selectors
      /*
      There are there important special characters:
      1. '^' symbol, represents the starting text in a string.
      2. '$' symbol represents the ending text in a string.
      3. '*' symbol represents contains text in a string.
      */
      .assert.visible('button[class*="Button-root"]') // *= Match a sub string;
      .assert.visible('a[href$="app-bar"]') // $= Match a suffix
      .assert.visible('div[class^="Demo-root"]') // ^= Match a prefix

      //  .assert.visible('button[class^="ButtonBase"]') // this wont' work because the first button.ButtonBase* is invisible;
                                                         // it bydefault takes the first element meet the query

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
