import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';

test.describe('JavaScript Alerts Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on JavaScript Alerts link');
    await homePage.clickJavaScriptAlerts();
  });

  test('should handle JS Alert @smoke', async ({ jsAlertsPage }) => {
    Logger.step('Set up alert handler');
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    Logger.step('Click JS Alert button');
    await jsAlertsPage.clickJSAlert();

    Logger.step('Verify alert text and result');
    expect(alertText).toBe('I am a JS Alert');
    
    const result = await jsAlertsPage.getResult();
    expect(result).toBe('You successfully clicked an alert');
  });

  test('should handle JS Confirm - Accept @regression', async ({ jsAlertsPage }) => {
    Logger.step('Set up confirm handler for accept');
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    Logger.step('Click JS Confirm button');
    await jsAlertsPage.clickJSConfirm();

    Logger.step('Verify confirm text and result');
    expect(alertText).toBe('I am a JS Confirm');
    
    const result = await jsAlertsPage.getResult();
    expect(result).toBe('You clicked: Ok');
  });

  test('should handle JS Confirm - Dismiss @regression', async ({ jsAlertsPage }) => {
    Logger.step('Set up confirm handler for dismiss');
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.dismiss();
    });

    Logger.step('Click JS Confirm button');
    await jsAlertsPage.clickJSConfirm();

    Logger.step('Verify confirm text and result');
    expect(alertText).toBe('I am a JS Confirm');
    
    const result = await jsAlertsPage.getResult();
    expect(result).toBe('You clicked: Cancel');
  });

  test('should handle JS Prompt with input @smoke', async ({ jsAlertsPage }) => {
    Logger.step('Set up prompt handler with input');
    let alertText = '';
    const inputText = 'Test Input';
    
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept(inputText);
    });

    Logger.step('Click JS Prompt button');
    await jsAlertsPage.clickJSPrompt();

    Logger.step('Verify prompt text and result');
    expect(alertText).toBe('I am a JS prompt');
    
    const result = await jsAlertsPage.getResult();
    expect(result).toBe(`You entered: ${inputText}`);
  });

  test('should handle JS Prompt - Cancel @regression', async ({ jsAlertsPage }) => {
    Logger.step('Set up prompt handler for cancel');
    let alertText = '';
    
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.dismiss();
    });

    Logger.step('Click JS Prompt button');
    await jsAlertsPage.clickJSPrompt();

    Logger.step('Verify prompt text and result');
    expect(alertText).toBe('I am a JS prompt');
    
    const result = await jsAlertsPage.getResult();
    expect(result).toBe('You entered: null');
  });

  test('should verify page title @smoke', async ({ jsAlertsPage }) => {
    Logger.step('Verify JavaScript Alerts page title');
    const title = await jsAlertsPage.getPageTitle();
    expect(title).toBe('JavaScript Alerts');
  });
});