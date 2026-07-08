import BasePage from './base.page.js';

class PricingPage extends BasePage {
  get pageHeading() {
    return $('h1, [class*="hero"] h1, [class*="pricing"] h1');
  }

  get pricingLinks() {
    return $$('main a[href*="/pricing/"]');
  }
  get contactUsLink() {
    return $('header a[href*="contact-us"]');
  }

  async open() {
    await super.open('/pricing');
    await this.waitForPageLoad();
  }

  async getHeadingText() {
    const heading = await this.pageHeading;
    return heading.getText();
  }

  async getVisibleContactUsLink() {
    const links = await $$('header a[href*="contact-us"]');
    for (const link of links) {
      if (await link.isDisplayed()) return link;
    }
    return null;
  }

  async getPricingCard(href) {
    const card = await $(`main a[href="${href}"]`);
    await card.scrollIntoView();
    return card;
  }

  async getFirstPricingLinkHref() {
    const links = await this.pricingLinks;
    return links[0].getAttribute('href');
  }
}

export default new PricingPage();
