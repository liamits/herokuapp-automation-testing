export interface User {
  username: string;
  password: string;
}

export interface TestConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

export interface PageElements {
  [key: string]: string;
}

export type BrowserType = 'chromium' | 'firefox' | 'webkit';

export interface TestData {
  users: {
    valid: User;
    invalid: User;
  };
  messages: {
    [key: string]: string;
  };
}