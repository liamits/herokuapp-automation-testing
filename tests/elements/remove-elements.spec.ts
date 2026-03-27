import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Remove Elements Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.clickAddRemoveElements();
  });

  test('should remove single element @smoke', async ({ addRemoveElementsPage }) => {
    // Arrange
    await addRemoveElementsPage.addMultipleElements(2);

    // Act
    await addRemoveElementsPage.removeElement(0);

    // Assert
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(1);
  });

  test('should remove all elements @regression', async ({ addRemoveElementsPage }) => {
    // Arrange
    await addRemoveElementsPage.addMultipleElements(3);

    // Act
    await addRemoveElementsPage.removeAllElements();

    // Assert
    const count = await addRemoveElementsPage.getElementCount();
    expect(count).toBe(0);
  });
});
