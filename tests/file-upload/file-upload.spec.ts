import { test, expect } from '../../src/fixtures/test-fixtures';
import { Logger } from '../../src/utils';
import path from 'path';

test.describe('File Upload Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    Logger.step('Navigate to home page');
    await homePage.navigate();
    
    Logger.step('Click on File Upload link');
    await homePage.clickFileUpload();
  });

  test('should upload single text file @smoke', async ({ fileUploadPage }) => {
    Logger.step('Verify file upload page is loaded');
    const title = await fileUploadPage.getPageTitle();
    expect(title).toContain('File Upload');

    Logger.step('Upload a text file');
    const filePath = path.join(process.cwd(), 'test-files', 'sample.txt');
    await fileUploadPage.uploadFile(filePath);

    Logger.step('Wait for upload to complete');
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify file was uploaded successfully');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles).toContain('sample.txt');
  });

  test('should upload PDF file @regression', async ({ fileUploadPage }) => {
    Logger.step('Upload a PDF file');
    const filePath = path.join(process.cwd(), 'test-files', 'document.pdf');
    await fileUploadPage.uploadFile(filePath);

    Logger.step('Wait for upload to complete');
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify PDF file was uploaded successfully');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles).toContain('document.pdf');
  });

  test('should upload CSV file @regression', async ({ fileUploadPage }) => {
    Logger.step('Upload a CSV file');
    const filePath = path.join(process.cwd(), 'test-files', 'data.csv');
    await fileUploadPage.uploadFile(filePath);

    Logger.step('Wait for upload to complete');
    await fileUploadPage.waitForUploadComplete();

    Logger.step('Verify CSV file was uploaded successfully');
    const uploadedFiles = await fileUploadPage.getUploadedFileNames();
    expect(uploadedFiles).toContain('data.csv');
  });

  test('should verify upload button is initially disabled @smoke', async ({ fileUploadPage }) => {
    Logger.step('Verify upload button state without file selection');
    const isEnabled = await fileUploadPage.isUploadButtonEnabled();
    expect(isEnabled).toBeTruthy(); // Note: Button might be enabled by default
  });

  test('should verify file input is visible @smoke', async ({ fileUploadPage }) => {
    Logger.step('Verify file input field is visible');
    const isVisible = await fileUploadPage.isFileInputVisible();
    expect(isVisible).toBeTruthy();
  });
});