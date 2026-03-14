import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';
import path from 'path';

test.describe('Multiple File Upload Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on File Upload link');
    await homePage.clickFileUpload();
  });

  test('should upload multiple files at once @regression', async ({ fileUploadPage }) => {
    Logger.step('Prepare multiple files for upload');
    const filePaths = [
      path.join(process.cwd(), 'test-files', 'sample.txt'),
      path.join(process.cwd(), 'test-files', 'data.csv')
    ];

    Logger.step('Upload multiple files');
    await fileUploadPage.uploadMultipleFiles(filePaths);

    Logger.step('Wait for upload to complete');
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify all files were uploaded successfully');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles).toContain('sample.txt');
    expect(uploadedFiles).toContain('data.csv');
    expect(uploadedFiles.length).toBeGreaterThanOrEqual(2);
  });

  test('should handle file selection and clearing @regression', async ({ fileUploadPage }) => {
    Logger.step('Select a file');
    const filePath = path.join(process.cwd(), 'test-files', 'sample.txt');
    await fileUploadPage.fileInput.setInputFiles(filePath);

    Logger.step('Verify file is selected');
    const selectedFile = await fileUploadPage.getSelectedFileName();
    expect(selectedFile).toBeTruthy();

    Logger.step('Clear file selection');
    await fileUploadPage.clearFileInput();

    Logger.step('Verify file selection is cleared');
    const clearedFile = await fileUploadPage.getSelectedFileName();
    expect(clearedFile).toBe('');
  });

  test('should verify page title and elements @smoke', async ({ fileUploadPage }) => {
    Logger.step('Verify page title');
    const title = await fileUploadPage.getPageTitle();
    expect(title).toContain('File Upload');

    Logger.step('Verify essential elements are present');
    const isFileInputVisible = await fileUploadPage.isFileInputVisible();
    const isUploadButtonEnabled = await fileUploadPage.isUploadButtonEnabled();
    
    expect(isFileInputVisible).toBeTruthy();
    expect(isUploadButtonEnabled).toBeTruthy();
  });
});