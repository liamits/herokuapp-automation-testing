import { TestData } from '../types';
import testData from '../../data/test-data.json';

export class DataHelper {
  private static data: TestData = testData as TestData;

  static getValidUser() {
    return this.data.users.valid;
  }

  static getInvalidUser() {
    return this.data.users.invalid;
  }

  static getMessage(key: string): string {
    return this.data.messages[key] || '';
  }

  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    return `test${this.generateRandomString(5)}@example.com`;
  }
}