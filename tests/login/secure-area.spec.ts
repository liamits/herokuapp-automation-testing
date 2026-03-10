import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper, Logger } from '../../src/utils';

test.describe('Secure Area Tests', () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    Logger.step('Navigate to home page and login');
    await homePage.navigate();
    await homePage.clickFormAuthentication();
    
    const validUser = DataHelper.getValidUser();
    await loginPage.login(validUser);
  });

  test('should display secure area after login @smoke', async ({ secureAreaPage }) => {
    Logger.step('Verify secure area page title');
    const title = await secureAreaPage.getPageTitle();
    expect(title).toContain('Secure Area');
  });

  test('should show welcome message @smoke', async ({ secureAreaPage }) => {
    Logger.step('Verify welcome message is displayed');
    const welcomeMessage = await secureAreaPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome to the Secure Area');
  });

  test('should display logout button @smoke', async ({ secureAreaPage }) => {
    Logger.step('Verify logout button is visible');
    const isLogoutVisible = await secureAreaPage.isLogoutButtonVisible();
    expect(isLogoutVisible).toBeTruthy();
  });
});