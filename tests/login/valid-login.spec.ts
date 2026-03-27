import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper } from '../../src/utils';

test.describe('Valid Login Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickFormAuthentication();
  });

  test('should login with valid credentials @smoke', async ({ loginPage }) => {
    // Arrange
    const validUser = DataHelper.getValidUser();

    // Act
    await loginPage.login(validUser);

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });

  test('should display welcome message after login @smoke', async ({ loginPage }) => {
    // Arrange
    const validUser = DataHelper.getValidUser();

    // Act
    await loginPage.login(validUser);

    // Assert
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged into a secure area!');
  });
});
