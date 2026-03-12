import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';

test.describe('Dropdown Selection', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Dropdown link');
    await homePage.clickDropdown();
  });

  test('should select option by value @smoke', async ({ dropdownPage }) => {
    Logger.step('Select Option 1 by value');
    await dropdownPage.selectOption('1');

    Logger.step('Verify Option 1 is selected');
    const selectedValue = await dropdownPage.getSelectedValue();
    expect(selectedValue).toBe('1');
  });

  test('should select option by text @regression', async ({ dropdownPage }) => {
    Logger.step('Select Option 2 by text');
    await dropdownPage.selectOptionByText('Option 2');

    Logger.step('Verify Option 2 is selected');
    const selectedText = await dropdownPage.getSelectedText();
    expect(selectedText).toBe('Option 2');
  });

  test('should get all available options @smoke', async ({ dropdownPage }) => {
    Logger.step('Get all dropdown options');
    const options = await dropdownPage.getAllOptions();

    Logger.step('Verify expected options are available');
    expect(options).toContain('Please select an option');
    expect(options).toContain('Option 1');
    expect(options).toContain('Option 2');
    expect(options.length).toBe(3);
  });
});