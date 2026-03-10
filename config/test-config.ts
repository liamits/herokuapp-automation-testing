import { TestConfig } from '../src/types';

export const testConfig: TestConfig = {
  baseUrl: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  retries: parseInt(process.env.RETRIES || '2'),
};

export const environments = {
  production: 'https://the-internet.herokuapp.com',
  staging: 'https://the-internet.herokuapp.com', // Same for demo
  local: 'http://localhost:3000',
};