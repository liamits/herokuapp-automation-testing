import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper } from '../../src/utils';

test.describe('Secure Area Tests', () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.navigate();
    await homePage.clickFormAuthentication();
    await loginPage.login(DataHelper.getValidUser());
  });

  test('should display secure area after login @smoke', async ({ secureAreaPage }) => {
    // Act
    const title = await secureAreaPage.getPageTitle();

    // Assert
    expect(title).toContain('Secure Area');
  });

  test('should show welcome message @smoke', async ({ secureAreaPage }) => {
    // Act
    const welcomeMessage = await secureAreaPage.getWelcomeMessage();

    // Assert
    expect(welcomeMessage).toContain('Welcome to the Secure Area');
  });

  test('should display logout button @smoke', async ({ secureAreaPage }) => {
    // Act
    const isLogoutVisible = await secureAreaPage.isLogoutButtonVisible();

    // Assert
    expect(isLogoutVisible).toBeTruthy();
  });
});
