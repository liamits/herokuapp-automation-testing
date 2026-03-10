import { test, expect } from '../src/fixtures/test-fixtures';
import { DataHelper, Logger } from '../src/utils';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
  });

  test('should login with valid credentials @smoke', async ({ homePage, loginPage }) => {
    Logger.step('Click on Form Authentication link');
    await homePage.clickFormAuthentication();

    Logger.step('Login with valid credentials');
    const validUser = DataHelper.getValidUser();
    await loginPage.login(validUser);

    Logger.step('Verify successful login');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeTruthy();
  });

  test('should show error with invalid credentials @regression', async ({ homePage, loginPage }) => {
    Logger.step('Click on Form Authentication link');
    await homePage.clickFormAuthentication();

    Logger.step('Login with invalid credentials');
    const invalidUser = DataHelper.getInvalidUser();
    await loginPage.login(invalidUser);

    Logger.step('Verify login failure');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
  });
});