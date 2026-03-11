import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';

test.describe('Remove Elements Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on Add/Remove Elements link');
    await homePage.clickAddRemoveElements();
  });

  test('should remove single element @smoke', async ({ addRemoveElementsPage }) => {
    Logger.step('Add 2 elements first');
    await addRemoveElementsPage.addMultipleElements(2);

    Logger.step('Remove one element');
    await addRemoveElementsPage.removeElement(0);

    Logger.step('Verify element count is reduced');
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(1);
  });

  test('should remove all elements @regression', async ({ addRemoveElementsPage }) => {
    Logger.step('Add 3 elements first');
    await addRemoveElementsPage.addMultipleElements(3);

    Logger.step('Remove all elements');
    await addRemoveElementsPage.removeAllElements();

    Logger.step('Verify no elements remain');
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(0);
  });
});