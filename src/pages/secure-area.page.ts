import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SecureAreaPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly logoutButton: Locator;
  private readonly flashMessage: Locator;
  private readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page, '/secure');
    this.pageTitle = page.locator('h2');
    this.logoutButton = page.locator('a').filter({ hasText: 'Logout' });
    this.flashMessage = page.locator('#flash');
    this.welcomeMessage = page.locator('.subheader');
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async isSecureAreaDisplayed(): Promise<boolean> {
    const title = await this.pageTitle.textContent();
    return title?.includes('Secure Area') || false;
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  async getFlashMessage(): Promise<string> {
    await this.waitForElement(this.flashMessage);
    return (await this.flashMessage.textContent())?.trim() || '';
  }
}