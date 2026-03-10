import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('✅ Test execution completed!');
}

export default globalTeardown;