import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DropdownPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly dropdown: Locator;

  constructor(page: Page) {
    super(page, '/dropdown');
    this.pageTitle = page.locator('h3');
    this.dropdown = page.locator('#dropdown');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async selectOption(value: string): Promise<void> {
    await this.dropdown.selectOption(value);
  }

  async selectOptionByText(text: string): Promise<void> {
    await this.dropdown.selectOption({ label: text });
  }

  async getSelectedValue(): Promise<string> {
    return await this.dropdown.inputValue();
  }

  async getSelectedText(): Promise<string> {
    const selectedOption = this.dropdown.locator('option:checked');
    return await selectedOption.textContent() || '';
  }

  async getAllOptions(): Promise<string[]> {
    const options = this.dropdown.locator('option');
    const count = await options.count();
    const optionTexts: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) {
        optionTexts.push(text);
      }
    }
    
    return optionTexts;
  }

  async isOptionAvailable(text: string): Promise<boolean> {
    const options = await this.getAllOptions();
    return options.includes(text);
  }
}