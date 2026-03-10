import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper, Logger } from '../../src/utils';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    Logger.step('Navigate to home page and login');
    await homePage.navigate();
    await homePage.clickFormAuthentication();
    
    const validUser = DataHelper.getValidUser();
    await loginPage.login(validUser);
  });

  test('should logout successfully @smoke', async ({ secureAreaPage, loginPage }) => {
    Logger.step('Click logout button');
    await secureAreaPage.logout();

    Logger.step('Verify logout success message');
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged out of the secure area!');
  });

  test('should redirect to login page after logout @regression', async ({ secureAreaPage, loginPage }) => {
    Logger.step('Click logout button');
    await secureAreaPage.logout();

    Logger.step('Verify redirected to login page');
    const currentUrl = loginPage.page.url();
    expect(currentUrl).toContain('/login');
  });
});