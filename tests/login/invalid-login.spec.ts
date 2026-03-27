import { test, expect } from '../../src/fixtures/test-fixtures';
import { DataHelper } from '../../src/utils';

test.describe('Invalid Login Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickFormAuthentication();
  });

  test('should show error with invalid credentials @regression', async ({ loginPage }) => {
    // Arrange
    const invalidUser = DataHelper.getInvalidUser();

    // Act
    await loginPage.login(invalidUser);

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeFalsy();
  });

  test('should show error with empty username @regression', async ({ loginPage }) => {
    // Act
    await loginPage.login({ username: '', password: 'password123' });

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeFalsy();
  });

  test('should show error with empty password @regression', async ({ loginPage }) => {
    // Act
    await loginPage.login({ username: 'tomsmith', password: '' });

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeFalsy();
  });

  test('should show error with both fields empty @regression', async ({ loginPage }) => {
    // Act
    await loginPage.login({ username: '', password: '' });

    // Assert
    expect(await loginPage.isLoginSuccessful()).toBeFalsy();
  });
});
