import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Dropdown Selection', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickDropdown();
  });

  test('should select option by value @smoke', async ({ dropdownPage }) => {
    // Act
    await dropdownPage.selectOption('1');

    // Assert
    const selectedValue = await dropdownPage.getSelectedValue();
    expect(selectedValue).toBe('1');
  });

  test('should select option by text @regression', async ({ dropdownPage }) => {
    // Act
    await dropdownPage.selectOptionByText('Option 2');

    // Assert
    const selectedText = await dropdownPage.getSelectedText();
    expect(selectedText).toBe('Option 2');
  });

  test('should get all available options @smoke', async ({ dropdownPage }) => {
    // Act
    const options = await dropdownPage.getAllOptions();

    // Assert
    expect(options).toContain('Please select an option');
    expect(options).toContain('Option 1');
    expect(options).toContain('Option 2');
    expect(options.length).toBe(3);
  });
});
