import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper, Logger } from '../../src/utils';

test.describe('Valid Login Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Form Authentication link');
    await homePage.clickFormAuthentication();
  });

  test('should login with valid credentials @smoke', async ({ loginPage }) => {
    Logger.step('Login with valid credentials');
    const validUser = DataHelper.getValidUser();
    await loginPage.login(validUser);

    Logger.step('Verify successful login');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeTruthy();
  });

  test('should display welcome message after login @smoke', async ({ loginPage }) => {
    Logger.step('Login with valid credentials');
    const validUser = DataHelper.getValidUser();
    await loginPage.login(validUser);

    Logger.step('Verify login success message contains expected text');
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged into a secure area!');
  });
});