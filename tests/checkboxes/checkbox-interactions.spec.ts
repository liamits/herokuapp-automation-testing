import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';

test.describe('Checkbox Interactions', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Checkboxes link');
    await homePage.clickCheckboxes();
  });

  test('should check and uncheck checkbox @smoke', async ({ checkboxesPage }) => {
    Logger.step('Check first checkbox');
    await checkboxesPage.checkCheckbox(0);
    
    Logger.step('Verify first checkbox is checked');
    const isChecked = await checkboxesPage.isCheckboxChecked(0);
    expect(isChecked).toBeTruthy();

    Logger.step('Uncheck first checkbox');
    await checkboxesPage.uncheckCheckbox(0);
    
    Logger.step('Verify first checkbox is unchecked');
    const isUnchecked = await checkboxesPage.isCheckboxChecked(0);
    expect(isUnchecked).toBeFalsy();
  });

  test('should toggle checkbox state @regression', async ({ checkboxesPage }) => {
    Logger.step('Get initial state of second checkbox');
    const initialState = await checkboxesPage.isCheckboxChecked(1);

    Logger.step('Toggle second checkbox');
    await checkboxesPage.toggleCheckbox(1);

    Logger.step('Verify checkbox state is toggled');
    const newState = await checkboxesPage.isCheckboxChecked(1);
    expect(newState).toBe(!initialState);
  });

  test('should verify checkbox count @smoke', async ({ checkboxesPage }) => {
    Logger.step('Get checkbox count');
    const count = await checkboxesPage.getCheckboxCount();
    
    Logger.step('Verify there are 2 checkboxes');
    expect(count).toBe(2);
  });
});