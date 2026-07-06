import homePage from '../pageobjects/home.page.js';

describe('Telnyx Home Page', () => {
  before(async () => {
    await homePage.open();
    await homePage.acceptCookiesIfPresent();
  });

  it('should load the home page with HTTP 200', async () => {
    const url = await homePage.getUrl();
    expect(url).toContain('telnyx.com');
  });

  it('should have a non-empty page title', async () => {
    const title = await homePage.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  it('should display the main h1 heading', async () => {
    const heading = await homePage.heroHeading;
    await expect(heading).toBeDisplayed();
    const text = await homePage.getHeroHeadingText();
    expect(text.length).toBeGreaterThan(0);
  });

  it('should display the navigation bar', async () => {
    const nav = await homePage.navigation;
    await expect(nav).toBeDisplayed();
  });

  it('should display a CTA (call-to-action) button', async () => {
    const cta = await homePage.ctaButton;
    await expect(cta).toBeDisplayed();
  });

  it('should have the Pricing link in navigation', async () => {
    const pricing = await homePage.navPricingButton;
    await expect(pricing).toBeDisplayed();
  });

  it('should display the footer', async () => {
    await homePage.scrollToBottom();
    const footer = await homePage.footer;
    await expect(footer).toBeDisplayed();
  });

  it('should have multiple footer links', async () => {
    const links = await homePage.footerLinks;
    expect(links.length).toBeGreaterThan(5);
  });

  it('should navigate to /pricing when Pricing link is clicked', async () => {
    await homePage.open();
    await homePage.clickNavPricing();
    const url = await browser.getUrl();
    expect(url).toContain('pricing');
  });

  it('should navigate to sign-up page when CTA is clicked', async () => {
    await homePage.open();
    await homePage.acceptCookiesIfPresent();
    const href = await homePage.getCtaHref();
    expect(href).toMatch(/sign-up|signup|register/i);
  });
});
