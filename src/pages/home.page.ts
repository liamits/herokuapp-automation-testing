import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly formAuthLink: Locator;
  private readonly addRemoveElementsLink: Locator;
  private readonly checkboxesLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.pageTitle = page.locator('h1');
    this.formAuthLink = page.locator('a[href="/login"]');
    this.addRemoveElementsLink = page.locator('a[href="/add_remove_elements/"]');
    this.checkboxesLink = page.locator('a[href="/checkboxes"]');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async clickFormAuthentication(): Promise<void> {
    await this.formAuthLink.click();
  }

  async clickAddRemoveElements(): Promise<void> {
    await this.addRemoveElementsLink.click();
  }

  async clickCheckboxes(): Promise<void> {
    await this.checkboxesLink.click();
  }
}