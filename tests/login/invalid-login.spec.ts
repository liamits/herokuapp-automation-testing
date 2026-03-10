import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper, Logger } from '../../src/utils';

test.describe('Invalid Login Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Form Authentication link');
    await homePage.clickFormAuthentication();
  });

  test('should show error with invalid credentials @regression', async ({ loginPage }) => {
    Logger.step('Login with invalid credentials');
    const invalidUser = DataHelper.getInvalidUser();
    await loginPage.login(invalidUser);

    Logger.step('Verify login failure');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
  });

  test('should show error with empty username @regression', async ({ loginPage }) => {
    Logger.step('Login with empty username');
    await loginPage.login({ username: '', password: 'password123' });

    Logger.step('Verify login failure');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
  });

  test('should show error with empty password @regression', async ({ loginPage }) => {
    Logger.step('Login with empty password');
    await loginPage.login({ username: 'tomsmith', password: '' });

    Logger.step('Verify login failure');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
  });

  test('should show error with both fields empty @regression', async ({ loginPage }) => {
    Logger.step('Login with both fields empty');
    await loginPage.login({ username: '', password: '' });

    Logger.step('Verify login failure');
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
  });
});