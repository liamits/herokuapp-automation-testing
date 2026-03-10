import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../types';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
  }

  async login(user: User): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  async getFlashMessage(): Promise<string> {
    await this.waitForElement(this.flashMessage);
    return (await this.flashMessage.textContent())?.trim() || '';
  }

  async isLoginSuccessful(): Promise<boolean> {
    const message = await this.getFlashMessage();
    return message.includes('You logged into a secure area!');
  }
}