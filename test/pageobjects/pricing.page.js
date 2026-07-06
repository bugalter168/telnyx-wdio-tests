import BasePage from './base.page.js';

class PricingPage extends BasePage {
  get pageHeading() {
    return $('h1, [class*="hero"] h1, [class*="pricing"] h1');
  }

  get pricingTabs() {
    return $$('[class*="tab"], [role="tab"]');
  }
  get pricingLinks() {
    return $$('main a[href*="/pricing/"]');
  }
  get contactSalesButton() {
    return $('main a[href*="contact"]');
  }

  async open() {
    await super.open('/pricing');
    await this.waitForPageLoad();
  }

  async getHeadingText() {
    const heading = await this.pageHeading;
    return heading.getText();
  }

  async getPricingCard(href) {
    const card = await $(`main a[href="${href}"]`);
    await card.scrollIntoView();
    return card;
  }

  async getFirstTabRole() {
    const tabs = await this.pricingTabs;
    if (tabs.length > 0) return tabs[0].getAttribute('role');
    return null;
  }

  async getFirstPricingLinkHref() {
    const links = await this.pricingLinks;
    return links[0].getAttribute('href');
  }
}

export default new PricingPage();
