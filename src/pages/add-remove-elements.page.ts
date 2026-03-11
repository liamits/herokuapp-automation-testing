import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AddRemoveElementsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly addElementButton: Locator;
  private readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page, '/add_remove_elements/');
    this.pageTitle = page.locator('h3');
    this.addElementButton = page.locator('button[onclick="addElement()"]');
    this.deleteButtons = page.locator('.added-manually');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async addElement(): Promise<void> {
    await this.addElementButton.click();
  }

  async removeElement(index: number = 0): Promise<void> {
    const deleteButton = this.deleteButtons.nth(index);
    await deleteButton.click();
  }

  async getElementCount(): Promise<number> {
    return await this.deleteButtons.count();
  }

  async addMultipleElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.addElement();
    }
  }

  async removeAllElements(): Promise<void> {
    const count = await this.getElementCount();
    for (let i = count - 1; i >= 0; i--) {
      await this.removeElement(i);
    }
  }

  async isAddButtonVisible(): Promise<boolean> {
    return await this.addElementButton.isVisible();
  }
}