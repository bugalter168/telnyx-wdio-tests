import signupPage from '../pageobjects/signup.page.js';

describe('Telnyx Sign Up Page', () => {
  beforeEach(async () => {
    await signupPage.open();
    await signupPage.waitForPageLoad();
  });

  it('should load the sign-up page URL', async () => {
    const url = await signupPage.getUrl();
    expect(url).toMatch(/sign-up|signup|register/i);
  });

  it('should have sign-up related page title', async () => {
    const title = await signupPage.getTitle();
    expect(title).toBeTruthy();
  });

  it('should display the page heading', async () => {
    const heading = await signupPage.pageHeading;
    await expect(heading).toBeDisplayed();
  });

  it('should display the email input field', async () => {
    const email = await signupPage.emailField;
    await expect(email).toBeDisplayed();
  });

  it('should display the password input field', async () => {
    const password = await signupPage.passwordField;
    await expect(password).toBeDisplayed();
  });

  it('should display the submit button', async () => {
    const btn = await signupPage.submitButton;
    await expect(btn).toBeDisplayed();
  });

  it('should display a link to the login page', async () => {
    await signupPage.loginLink.waitForDisplayed({ timeout: 15000 });
    await expect(signupPage.loginLink).toBeDisplayed();
  });

  it('should show error when submitting empty form', async () => {
    await signupPage.submit();
    await signupPage.formErrors[0].waitForDisplayed({ timeout: 5000 });
    const errors = await signupPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should show error for invalid email format', async () => {
    await signupPage.fillEmail('not-an-email');
    await signupPage.submit();
    await browser.waitUntil(async () => (await signupPage.isEmailValid()) === false, {
      timeout: 5000,
      timeoutMsg: 'Email did not become invalid',
    });
    expect(await signupPage.isEmailValid()).toBe(false);
  });

  it('should allow typing a valid email without immediate error', async () => {
    await signupPage.fillEmail('test@example.com');
    const value = await signupPage.getEmailValue();
    expect(value).toBe('test@example.com');
  });

  it('should allow typing a password', async () => {
    await signupPage.fillPassword('SecurePass123!');
    const value = await signupPage.getPasswordValue();
    expect(value).toBe('SecurePass123!');
  });

  it('should have password field of type "password"', async () => {
    const type = await signupPage.getPasswordType();
    expect(type).toBe('password');
  });

  it('should display Terms of Service link', async () => {
    await expect(signupPage.termsLink).toBeDisplayed();
    await expect(signupPage.termsLink).toHaveText(/terms/i);
  });

  it('should display Privacy Policy link', async () => {
    await expect(signupPage.privacyLink).toBeDisplayed();
    await expect(signupPage.privacyLink).toHaveText(/privacy/i);
  });

  it('should have email field with email type attribute', async () => {
    const type = await signupPage.getEmailFieldType();
    expect(type).toBe('email');
  });

  it('should have submit button that is enabled by default', async () => {
    const enabled = await signupPage.isSubmitButtonEnabled();
    expect(enabled).toBe(true);
  });
});
