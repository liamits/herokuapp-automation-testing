import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper } from '../../src/utils';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.navigate();
    await homePage.clickFormAuthentication();
    await loginPage.login(DataHelper.getValidUser());
  });

  test('should logout successfully @smoke', async ({ secureAreaPage, loginPage }) => {
    // Act
    await secureAreaPage.logout();

    // Assert
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged out of the secure area!');
  });

  test('should redirect to login page after logout @regression', async ({ secureAreaPage, loginPage }) => {
    // Act
    await secureAreaPage.logout();

    // Assert
    expect(loginPage.page.url()).toContain('/login');
  });
});
