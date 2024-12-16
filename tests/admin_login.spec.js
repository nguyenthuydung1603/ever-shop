const { test, expect } = require('@playwright/test');
const {iStep} = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
let adminLoginPage;
let dashboardPage;
test.beforeAll('Before all', async ({page}) =>{
  adminLoginPage= new AdminLoginPage(page);
  dashboardPage = new DashboardPage(page);
})

// Bổ sung test case failed
test('Verify admin login succesfully', async ({ page }) => {
  await iStep(`I open Admin Page`,adminLoginPage.open());
  await iStep(`User should be on page Admin Login`, adminLoginPage.isOnPage());
  await iStep(`User input Email:`,adminLoginPage.inputTextByLabel('Email', 'admin@gmail.com'));
  await iStep(`User input Email:`,adminLoginPage.inputTextByLabel('Password', 'admin1234'));
  await iStep(`Then user click button: SIGN IN`, adminLoginPage.clickButtonByLabel('SIGN IN'));
  await iStep(`User should be on page Dashboard`, dashboardPage.isOnPage());
});