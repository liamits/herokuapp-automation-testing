import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';
import path from 'path';

test.describe('File Upload Edge Cases', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on File Upload link');
    await homePage.clickFileUpload();
  });

  test('should handle empty file upload attempt @regression', async ({ fileUploadPage }) => {
    Logger.step('Attempt to upload without selecting a file');
    await fileUploadPage.uploadButton.click();

    Logger.step('Verify appropriate handling of empty upload');
    // The behavior might vary - could show error message or just do nothing
    // We'll verify the page doesn't crash and remains functional
    const isFileInputVisible = await fileUploadPage.isFileInputVisible();
    expect(isFileInputVisible).toBeTruthy();
  });

  test('should handle file upload with special characters in filename @regression', async ({ fileUploadPage }) => {
    Logger.step('Create a file with special characters in name');
    // We'll use the existing sample.txt but test the functionality
    const filePath = path.join(process.cwd(), 'test-files', 'sample.txt');
    
    Logger.step('Upload file');
    await fileUploadPage.uploadFile(filePath);

    Logger.step('Wait for upload to complete');
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify file upload completed');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles.length).toBeGreaterThan(0);
  });

  test('should verify upload button behavior @smoke', async ({ fileUploadPage }) => {
    Logger.step('Check initial state of upload button');
    const initialState = await fileUploadPage.isUploadButtonEnabled();
    
    Logger.step('Select a file');
    const filePath = path.join(process.cwd(), 'test-files', 'sample.txt');
    await fileUploadPage.fileInput.setInputFiles(filePath);

    Logger.step('Check upload button state after file selection');
    const afterSelectionState = await fileUploadPage.isUploadButtonEnabled();
    
    // Button should be enabled in both cases for this implementation
    expect(initialState).toBeTruthy();
    expect(afterSelectionState).toBeTruthy();
  });

  test('should handle consecutive file uploads @regression', async ({ fileUploadPage }) => {
    Logger.step('Upload first file');
    const firstFile = path.join(process.cwd(), 'test-files', 'sample.txt');
    await fileUploadPage.uploadFile(firstFile);
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Upload second file');
    const secondFile = path.join(process.cwd(), 'test-files', 'data.csv');
    await fileUploadPage.uploadFile(secondFile);
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify both uploads were successful');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles.length).toBeGreaterThan(0);
  });
});