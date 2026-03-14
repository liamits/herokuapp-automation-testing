import { test as base } from '@playwright/test';
import { 
  HomePage, 
  LoginPage, 
  SecureAreaPage,
  AddRemoveElementsPage,
  CheckboxesPage,
  DropdownPage,
  JavaScriptAlertsPage,
  FileUploadPage
} from '../pages';

type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
  addRemoveElementsPage: AddRemoveElementsPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  jsAlertsPage: JavaScriptAlertsPage;
  fileUploadPage: FileUploadPage;
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

  secureAreaPage: async ({ page }, use) => {
    const secureAreaPage = new SecureAreaPage(page);
    await use(secureAreaPage);
  },

  addRemoveElementsPage: async ({ page }, use) => {
    const addRemoveElementsPage = new AddRemoveElementsPage(page);
    await use(addRemoveElementsPage);
  },

  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },

  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },

  jsAlertsPage: async ({ page }, use) => {
    const jsAlertsPage = new JavaScriptAlertsPage(page);
    await use(jsAlertsPage);
  },

  fileUploadPage: async ({ page }, use) => {
    const fileUploadPage = new FileUploadPage(page);
    await use(fileUploadPage);
  },
});

export { expect } from '@playwright/test';