class BasePage {
  async open(path = '') {
    await browser.url(path);
  }

  async getTitle() {
    return browser.getTitle();
  }

  async getUrl() {
    return browser.getUrl();
  }

  async waitForPageLoad() {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      { timeout: 15000, timeoutMsg: 'Page did not load within 15s' }
    );
  }

  async scrollToElement(element) {
    await element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async isElementVisible(element) {
    try {
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async scrollToBottom() {
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    await browser.pause(500);
  }
}

export default BasePage;
