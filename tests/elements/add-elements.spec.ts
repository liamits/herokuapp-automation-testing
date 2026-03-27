import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Add Elements Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickAddRemoveElements();
  });

  test('should add single element @smoke', async ({ addRemoveElementsPage }) => {
    // Act
    await addRemoveElementsPage.addElement();

    // Assert
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(1);
  });

  test('should add multiple elements @regression', async ({ addRemoveElementsPage }) => {
    // Act
    await addRemoveElementsPage.addMultipleElements(3);

    // Assert
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(3);
  });
});
