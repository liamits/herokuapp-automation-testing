import { test as base } from '@playwright/test';
import { HomePage, LoginPage } from '../pages';

type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';