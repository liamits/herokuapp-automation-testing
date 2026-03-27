import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Checkbox Interactions', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickCheckboxes();
  });

  test('should check and uncheck checkbox @smoke', async ({ checkboxesPage }) => {
    // Act
    await checkboxesPage.checkCheckbox(0);

    // Assert - checked
    expect(await checkboxesPage.isCheckboxChecked(0)).toBeTruthy();

    // Act
    await checkboxesPage.uncheckCheckbox(0);

    // Assert - unchecked
    expect(await checkboxesPage.isCheckboxChecked(0)).toBeFalsy();
  });

  test('should toggle checkbox state @regression', async ({ checkboxesPage }) => {
    // Arrange
    const initialState = await checkboxesPage.isCheckboxChecked(1);

    // Act
    await checkboxesPage.toggleCheckbox(1);

    // Assert
    const newState = await checkboxesPage.isCheckboxChecked(1);
    expect(newState).toBe(!initialState);
  });

  test('should verify checkbox count @smoke', async ({ checkboxesPage }) => {
    // Act
    const count = await checkboxesPage.getCheckboxCount();

    // Assert
    expect(count).toBe(2);
  });
});
