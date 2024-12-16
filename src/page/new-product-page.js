const { MasterPage } = require('./master-page');
const { expect } = require('@playwright/test');
const path = require('path');

exports.NewProductPage = class NewProductPage extends MasterPage {
    pageHeader = "//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='Create A New Product']]";

    constructor(page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.locator(this.pageHeader)).toBeVisible();
    }

    async uploadProductImage(imagePath) {
        let pathToUploadFile = path.join(process.cwd(), imagePath);
        let xpath = "//*[@id='images']//input[@type='file']";
        await this.page.locator(xpath).setInputFiles(pathToUploadFile);
    }

    async selectAttribute(label, value) {
        let xpath = `//tr[./td[.//text()[normalize-space()='${label}']]]//select`;
        await this.page.locator(xpath).selectOption(value);
    }

    async inputRandomSku(){
        let sku= `${new Date().getTime()}`;
        await this.inputTextByLabel('SKU', sku);

    }
}