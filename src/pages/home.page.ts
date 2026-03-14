import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly formAuthLink: Locator;
  private readonly addRemoveElementsLink: Locator;
  private readonly checkboxesLink: Locator;
  private readonly dropdownLink: Locator;
  private readonly jsAlertsLink: Locator;
  private readonly fileUploadLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.pageTitle = page.locator('h1');
    this.formAuthLink = page.locator('a[href="/login"]');
    this.addRemoveElementsLink = page.locator('a[href="/add_remove_elements/"]');
    this.checkboxesLink = page.locator('a[href="/checkboxes"]');
    this.dropdownLink = page.locator('a[href="/dropdown"]');
    this.jsAlertsLink = page.locator('a[href="/javascript_alerts"]');
    this.fileUploadLink = page.locator('a[href="/upload"]');
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

  async clickDropdown(): Promise<void> {
    await this.dropdownLink.click();
  }

  async clickJavaScriptAlerts(): Promise<void> {
    await this.jsAlertsLink.click();
  }

  async clickFileUpload(): Promise<void> {
    await this.fileUploadLink.click();
  }
}