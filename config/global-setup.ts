import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig): Promise<void> {
  console.log('🚀 Starting test execution...');
  console.log(`Base URL: ${config.use?.baseURL}`);
  console.log(`Workers: ${config.workers}`);
}

export default globalSetup;