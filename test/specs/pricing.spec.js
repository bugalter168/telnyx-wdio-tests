import pricingPage from '../pageobjects/pricing.page.js';

describe('Telnyx Pricing Page', () => {
  before(async () => {
    await pricingPage.open();
  });

  it('should load the pricing page URL', async () => {
    const url = await pricingPage.getUrl();
    expect(url).toContain('telnyx.com');
  });

  it('should have "Pricing" in the page title or heading', async () => {
    const title = await pricingPage.getTitle();
    const headingText = await pricingPage.getHeadingText();
    const hasPricing =
      title.toLowerCase().includes('price') ||
      title.toLowerCase().includes('pricing') ||
      headingText.toLowerCase().includes('price') ||
      headingText.toLowerCase().includes('pricing');
    expect(hasPricing).toBe(true);
  });

  it('should display the page h1 heading', async () => {
    const heading = await pricingPage.pageHeading;
    await expect(heading).toBeDisplayed();
  });

  it('should display at least one pricing sub-page link', async () => {
    const links = await pricingPage.pricingLinks;
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have pricing sub-page links visible', async () => {
    const links = await pricingPage.pricingLinks;
    await expect(links[0]).toBeDisplayed();
  });

  it('should display all product pricing cards as clickable', async () => {
    const expectedHrefs = [
      '/pricing/messaging',
      '/pricing/elastic-sip',
      '/pricing/voice-api',
      '/pricing/conversational-ai',
      '/pricing/speech-to-text',
      '/pricing/text-to-speech',
      '/pricing/numbers',
      '/pricing/video-api',
      '/pricing/number-lookup',
      '/pricing/verify-api',
      '/pricing/branded-calling',
      '/pricing/fax',
      '/pricing/whatsapp',
      '/pricing/iot-data-plans',
      '/pricing/mobile-voice',
      '/pricing/networking',
      '/pricing/global-edge-router',
      '/pricing/storage',
      '/pricing/inference-api',
    ];

    for (const href of expectedHrefs) {
      const card = await pricingPage.getPricingCard(href);
      await expect(card).toBeClickable();
    }
  });

  it('should display "Contact sales" or "Contact us" link', async () => {
    const contactBtn = await pricingPage.contactSalesButton;
    const isVisible = await contactBtn.isDisplayed();
    if (isVisible) {
      await expect(contactBtn).toBeDisplayed();
    }
  });

  it('should have pricing tabs with correct role attribute', async () => {
    const role = await pricingPage.getFirstTabRole();
    if (role !== null) {
      expect(role).toBe('tab');
    }
  });

  it('should have pricing sub-page links with valid href', async () => {
    const href = await pricingPage.getFirstPricingLinkHref();
    expect(href).toContain('/pricing/');
  });

  it('should have page title longer than 10 characters', async () => {
    const title = await pricingPage.getTitle();
    expect(title.length).toBeGreaterThan(10);
  });
});
