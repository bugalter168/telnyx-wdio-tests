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
    await browser.waitUntil(
      async () => {
        const before = await browser.execute(() => document.body.scrollHeight);
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        const after = await browser.execute(() => document.body.scrollHeight);
        return before === after;
      },
      { timeout: 5000, timeoutMsg: 'Page kept growing while scrolling' }
    );
  }
}

export default BasePage;
