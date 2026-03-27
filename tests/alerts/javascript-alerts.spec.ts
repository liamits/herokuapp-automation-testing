import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('JavaScript Alerts Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickJavaScriptAlerts();
  });

  test('should handle JS Alert @smoke', async ({ jsAlertsPage }) => {
    // Arrange
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    // Act
    await jsAlertsPage.clickJSAlert();

    // Assert
    expect(alertText).toBe('I am a JS Alert');
    expect(await jsAlertsPage.getResult()).toBe('You successfully clicked an alert');
  });

  test('should handle JS Confirm - Accept @regression', async ({ jsAlertsPage }) => {
    // Arrange
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    // Act
    await jsAlertsPage.clickJSConfirm();

    // Assert
    expect(alertText).toBe('I am a JS Confirm');
    expect(await jsAlertsPage.getResult()).toBe('You clicked: Ok');
  });

  test('should handle JS Confirm - Dismiss @regression', async ({ jsAlertsPage }) => {
    // Arrange
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.dismiss();
    });

    // Act
    await jsAlertsPage.clickJSConfirm();

    // Assert
    expect(alertText).toBe('I am a JS Confirm');
    expect(await jsAlertsPage.getResult()).toBe('You clicked: Cancel');
  });

  test('should handle JS Prompt with input @smoke', async ({ jsAlertsPage }) => {
    // Arrange
    const inputText = 'Test Input';
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept(inputText);
    });

    // Act
    await jsAlertsPage.clickJSPrompt();

    // Assert
    expect(alertText).toBe('I am a JS prompt');
    expect(await jsAlertsPage.getResult()).toBe(`You entered: ${inputText}`);
  });

  test('should handle JS Prompt - Cancel @regression', async ({ jsAlertsPage }) => {
    // Arrange
    let alertText = '';
    jsAlertsPage.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.dismiss();
    });

    // Act
    await jsAlertsPage.clickJSPrompt();

    // Assert
    expect(alertText).toBe('I am a JS prompt');
    expect(await jsAlertsPage.getResult()).toBe('You entered: null');
  });

  test('should verify page title @smoke', async ({ jsAlertsPage }) => {
    // Act
    const title = await jsAlertsPage.getPageTitle();

    // Assert
    expect(title).toBe('JavaScript Alerts');
  });
});
