import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';

test.describe('Add Elements Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Add/Remove Elements link');
    await homePage.clickAddRemoveElements();
  });

  test('should add single element @smoke', async ({ addRemoveElementsPage }) => {
    Logger.step('Add one element');
    await addRemoveElementsPage.addElement();

    Logger.step('Verify element is added');
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(1);
  });

  test('should add multiple elements @regression', async ({ addRemoveElementsPage }) => {
    Logger.step('Add 3 elements');
    await addRemoveElementsPage.addMultipleElements(3);

    Logger.step('Verify 3 elements are added');
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(3);
  });
});