import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class JavaScriptAlertsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly jsAlertButton: Locator;
  private readonly jsConfirmButton: Locator;
  private readonly jsPromptButton: Locator;
  private readonly result: Locator;

  constructor(page: Page) {
    super(page, '/javascript_alerts');
    this.pageTitle = page.locator('h3');
    this.jsAlertButton = page.locator('button[onclick="jsAlert()"]');
    this.jsConfirmButton = page.locator('button[onclick="jsConfirm()"]');
    this.jsPromptButton = page.locator('button[onclick="jsPrompt()"]');
    this.result = page.locator('#result');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async clickJSAlert(): Promise<void> {
    await this.jsAlertButton.click();
  }

  async clickJSConfirm(): Promise<void> {
    await this.jsConfirmButton.click();
  }

  async clickJSPrompt(): Promise<void> {
    await this.jsPromptButton.click();
  }

  async getResult(): Promise<string> {
    return await this.result.textContent() || '';
  }

  async handleAlertAndGetText(): Promise<string> {
    let alertText = '';
    
    this.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    return alertText;
  }

  async handleConfirm(action: 'accept' | 'dismiss'): Promise<string> {
    let alertText = '';
    
    this.page.on('dialog', async dialog => {
      alertText = dialog.message();
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    return alertText;
  }

  async handlePrompt(inputText: string, action: 'accept' | 'dismiss' = 'accept'): Promise<string> {
    let alertText = '';
    
    this.page.on('dialog', async dialog => {
      alertText = dialog.message();
      if (action === 'accept') {
        await dialog.accept(inputText);
      } else {
        await dialog.dismiss();
      }
    });

    return alertText;
  }
}