const { test, expect } = require('@playwright/test');
const { iStep } = require('../src/utils/steps-utils');

const { AdminLoginPage } = require('../src/page/admin-login-page');
const { DashboardPage } = require('../src/page/dashboard-page');
const { NewProductPage } = require('../src/page/new-product-page');
const { EditProductPage } = require('../src/page/edit-product-page');

let adminLoginPage;
let dashboardPage;
let newProductPage;
let editProductPage;

test.beforeEach('Before each', async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    dashboardPage = new DashboardPage(page);
    newProductPage = new NewProductPage(page);
    editProductPage = new EditProductPage(page);

})

test('Verify admin is able to create new product', async ({ page }) => {
    await iStep(`I login to system by admin`, adminLoginPage, adminLoginPage.loginAsAdmin);
    await iStep(`I should be on page Dashboard`, dashboardPage, dashboardPage.isOnPage);
    await iStep(`I select menu item New Product`, dashboardPage, dashboardPage.selectMenuItem, 'New Product');
    await iStep(`I should be on New Product page `, newProductPage, newProductPage.isOnPage);
    await iStep(`I input Name: Giày Thể Thao Nam Bitis Hunter Tennis`, newProductPage, newProductPage.inputTextByLabel, 'Name', 'Giày Thể Thao Nam Bitis Hunter Tennis');
    // await iStep(`I input SKU: HSM008500XNH`, newProductPage, newProductPage.inputTextByLabel, 'SKU', 'HSM008500XNH');
    await iStep(`I input a random SKU: HSM008500XNH`, newProductPage, newProductPage.inputRandomSku);
    await iStep(`I input Price: 800`, newProductPage, newProductPage.inputTextByLabel, 'Price', '800');
    await iStep(`I input Weight: 0.1`, newProductPage, newProductPage.inputTextByLabel, 'Weight', '0.1');
    await iStep(`I select 'Men' product category`, newProductPage, newProductPage.selectCategory, 'Category', 'Men');
    await iStep(`I select option Taxable Goods in Tax class`, newProductPage, newProductPage.selectOptionByLabel, 'Tax class', 'Taxable Goods');
    await iStep(`I select the first Description type`, newProductPage, newProductPage.selectDescriptionType, 1);
    await iStep(`I input the following description`, newProductPage, newProductPage.inputDescription, 'My description');
    await iStep(`I upload product image`, newProductPage, newProductPage.uploadProductImage, 'src/data/bitis.webp');
    await iStep(`I input Url key`, newProductPage, newProductPage.inputTextByLabel, 'Url key', 'bitis_key');
    await iStep(`I input Meta title`, newProductPage, newProductPage.inputTextByLabel, 'Meta title', 'bitis_meta');
    await iStep(`I input Meta keywords`, newProductPage, newProductPage.inputTextByLabel, 'Meta keywords', 'bitis_keywords');
    await iStep(`I input Meta description`, newProductPage, newProductPage.inputTextAreaByLabel, 'Meta keywords', 'My meta description');
    await iStep(`I select product status is Disabled`, newProductPage, newProductPage.selectRadioOptionByLabel, 'Status', 'Disabled');
    await iStep(`I select product status is Visibility`, newProductPage, newProductPage.selectRadioOptionByLabel, 'Visibility', 'Not visible');
    await iStep(`I select product status is Manage stock?`, newProductPage, newProductPage.selectRadioOptionByLabel, 'Manage stock?', 'No');
    await iStep(`I select product status is Stock availability`, newProductPage, newProductPage.selectRadioOptionByLabel, 'Stock availability', 'No');
    await iStep(`I input Quantity: 10`, newProductPage, newProductPage.inputTextByLabel, 'Quantity', '10');
    await iStep(`I select product attribute color: Black`, newProductPage, newProductPage.selectAttribute, 'Color', 'Black');
    await iStep(`I select product attribute size: XL`, newProductPage, newProductPage.selectAttribute, 'Size', 'XL');
    await iStep(`Then user click button: SIGN IN`, newProductPage, newProductPage.clickButtonByLabel, 'Save');
    await iStep(`I should see message: Product saved successfully!`, newProductPage, newProductPage.verifyNotification, 'Product saved successfully!');
    await iStep(`I should see Edit Product Page`, editProductPage, editProductPage.isOnPage, 'Editing Giày Thể Thao Nam Bitis Hunter Tennis');
    await iStep('I clean up test data', editProductPage, editProductPage.cleanUpData);
});
