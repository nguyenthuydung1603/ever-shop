const { test, expect } = require('@playwright/test');
const {iStep} = require('../src/utils/steps-utils');
const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');

// Bổ sung test case failed
test('Verify admin login succesfully', async ({ page }) => {
  let adminLoginPage= new AdminLoginPage(page);
  let dashboardPage = new DashboardPage(page);
  await iStep(`I open Admin Page`,adminLoginPage.open());
  await iStep(`User should be on page Admin Login`, adminLoginPage.isOnPage());
  await iStep(`User input Email:`,adminLoginPage.inputTextByLabel('Email', 'admin@gmail.com'));
  await iStep(`User input Email:`,adminLoginPage.inputTextByLabel('Password', 'admin1234'));
  await iStep(`Then user click button: SIGN IN`, adminLoginPage.clickButtonByLabel('SIGN IN'));
  await iStep(`User should be on page Dashboard`, dashboardPage.isOnPage());
});