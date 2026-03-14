import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class FileUploadPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly fileInput: Locator;
  private readonly uploadButton: Locator;
  private readonly uploadedFiles: Locator;
  private readonly dragDropArea: Locator;

  constructor(page: Page) {
    super(page, '/upload');
    this.pageTitle = page.locator('h3');
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFiles = page.locator('#uploaded-files');
    this.dragDropArea = page.locator('#drag-drop-upload');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  async uploadMultipleFiles(filePaths: string[]): Promise<void> {
    await this.fileInput.setInputFiles(filePaths);
    await this.uploadButton.click();
  }

  async getUploadedFileNames(): Promise<string[]> {
    const fileElements = this.uploadedFiles.locator('div');
    const count = await fileElements.count();
    const fileNames: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const fileName = await fileElements.nth(i).textContent();
      if (fileName) {
        fileNames.push(fileName.trim());
      }
    }
    
    return fileNames;
  }

  async isUploadButtonEnabled(): Promise<boolean> {
    return await this.uploadButton.isEnabled();
  }

  async isFileInputVisible(): Promise<boolean> {
    return await this.fileInput.isVisible();
  }

  async clearFileInput(): Promise<void> {
    await this.fileInput.setInputFiles([]);
  }

  async dragAndDropFile(filePath: string): Promise<void> {
    // Create a file input for drag and drop simulation
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.dragDropArea.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async getSelectedFileName(): Promise<string> {
    return await this.fileInput.inputValue();
  }

  async waitForUploadComplete(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.waitForElement(this.uploadedFiles);
  }
}