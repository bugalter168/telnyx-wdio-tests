import BasePage from './base.page.js';

class HomePage extends BasePage {
  get logo() {
    return $('a[href="/"]img, header img, [class*="logo"]');
  }
  get navigation() {
    return $('#site-header');
  }

  get heroHeading() {
    return $('h1');
  }
  get ctaButton() {
    return $('a[href="/sign-up"]');
  }
  get navPricingButton() {
    return $('button=Pricing');
  }
  get navPricingLink() {
    return $('[data-radix-popper-content-wrapper] a[href="/pricing"]');
  }
  get footer() {
    return $('footer');
  }
  get footerLinks() {
    return $$('footer a');
  }
  get cookieBanner() {
    return $('[class*="cookie"], [id*="cookie"], [class*="consent"]');
  }
  get cookieAccept() {
    return $('[class*="cookie"] button, [id*="cookie"] button');
  }

  async acceptCookiesIfPresent() {
    try {
      const banner = await this.cookieBanner;
      if (await banner.isDisplayed()) {
        await this.cookieAccept.click();
        await browser.pause(500);
      }
    } catch {}
  }

  async open() {
    await super.open('/');
    await this.waitForPageLoad();
  }

  async clickCTA() {
    await this.ctaButton.click();
  }

  async clickNavPricing() {
    await this.navPricingButton.click();
    await this.navPricingLink.waitForClickable({ timeout: 5000 });
    await this.navPricingLink.click();
    await browser.pause(1000);
    await this.waitForPageLoad();
  }

  async getHeroHeadingText() {
    const heading = await this.heroHeading;
    return heading.getText();
  }

  async getCtaHref() {
    return this.ctaButton.getAttribute('href');
  }
}

export default new HomePage();
