const { MasterPage } = require('./master-page');
const { expect } = require('@playwright/test');
const path = require('path');

exports.EditProductPage = class EditProductPage extends MasterPage {

    constructor(page) {
        super(page);
    }

    async isOnPage(productName) {
        let pageHeader = `//h1[contains(concat(' ',@class,' '), ' page-heading-title ') and ./text()[normalize-space()='${productName}']]`;
        await expect(this.page.locator(pageHeader)).toBeVisible();
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

    async cleanUpData(){
        await expect(this.page.url()).toContain("admin/products/edit");
        let id = this.page.url().split('/').pop();
        await this.page.request.delete(`http://localhost:3000/api/products/${id}`)
    }
}