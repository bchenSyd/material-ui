module.exports = {
  'Docs Home': function DocsHome(browser) {
    browser
      .maximizeWindow()
      .url(browser.launch_url)
      .waitForElementVisible('[data-reactroot]', 6000)
      .assert.elementPresent('img[class^=Home-logo]')
      .end();
  },
};
