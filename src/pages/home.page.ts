import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly formAuthLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.pageTitle = page.locator('h1');
    this.formAuthLink = page.locator('a[href="/login"]');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async clickFormAuthentication(): Promise<void> {
    await this.formAuthLink.click();
  }
}