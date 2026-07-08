import BasePage from './base.page.js';

class SignupPage extends BasePage {
  get emailField() {
    return $('input[type="email"], input[name="email"], input[placeholder*="email" i]');
  }
  get passwordField() {
    return $('input[type="password"], input[name="password"]');
  }
  get firstNameField() {
    return $('input[name="first_name"], input[name="firstName"], input[placeholder*="first" i]');
  }
  get lastNameField() {
    return $('input[name="last_name"], input[name="lastName"], input[placeholder*="last" i]');
  }
  get submitButton() {
    return $('button[type="submit"]');
  }
  get loginLink() {
    return $('a[href*="portal.telnyx.com"]');
  }
  get emailError() {
    return $(
      '[class*="error"][class*="email"], [data-testid*="email-error"], input[name="email"] + [class*="error"]'
    );
  }
  get formErrors() {
    return $$('[class*="error"], [class*="invalid"], [role="alert"]');
  }
  get googleSignupButton() {
    return $('[class*="google"]');
  }
  get termsLink() {
    return $('a[href*="terms"]');
  }
  get privacyLink() {
    return $('a[href*="privacy"]');
  }
  get pageHeading() {
    return $('h1, h2');
  }

  async open() {
    await super.open('/sign-up');
    await this.waitForPageLoad();
  }

  async fillEmail(email) {
    await this.emailField.setValue(email);
  }

  async fillPassword(password) {
    await this.passwordField.setValue(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillAndSubmit({ email = '', password = '' } = {}) {
    if (email) await this.fillEmail(email);
    if (password) await this.fillPassword(password);
    await this.submit();
  }

  async getErrorMessages() {
    const errors = await this.formErrors;
    return Promise.all(Array.from(errors).map((e) => e.getText()));
  }

  async isEmailValid() {
    const emailField = await this.emailField;
    return browser.execute((el) => el.validity.valid, emailField);
  }

  async getEmailValue() {
    const emailField = await this.emailField;
    return emailField.getValue();
  }

  async getPasswordValue() {
    const passField = await this.passwordField;
    return passField.getValue();
  }

  async getPasswordType() {
    const passField = await this.passwordField;
    return passField.getAttribute('type');
  }

  async getEmailFieldType() {
    const emailField = await this.emailField;
    return emailField.getAttribute('type');
  }

  async isSubmitButtonEnabled() {
    const btn = await this.submitButton;
    return btn.isEnabled();
  }
}

export default new SignupPage();
