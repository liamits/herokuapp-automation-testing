import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckboxesPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page, '/checkboxes');
    this.pageTitle = page.locator('h3');
    this.checkboxes = page.locator('input[type="checkbox"]');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async checkCheckbox(index: number): Promise<void> {
    const checkbox = this.checkboxes.nth(index);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async uncheckCheckbox(index: number): Promise<void> {
    const checkbox = this.checkboxes.nth(index);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  async toggleCheckbox(index: number): Promise<void> {
    const checkbox = this.checkboxes.nth(index);
    await checkbox.click();
  }

  async isCheckboxChecked(index: number): Promise<boolean> {
    const checkbox = this.checkboxes.nth(index);
    return await checkbox.isChecked();
  }

  async getCheckboxCount(): Promise<number> {
    return await this.checkboxes.count();
  }
}