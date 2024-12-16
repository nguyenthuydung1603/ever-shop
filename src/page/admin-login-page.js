const {MasterPage} = require('./master-page');
const {expect} = require('@playwright/test');


exports.AdminLoginPage = class AdminLoginPage extends MasterPage{
    url='http://localhost:3000/admin/login';

    constructor (page){
        super(page);
    };

    async open(){
        await this.page.goto(this.url);
    };

    async isOnPage(){
        await expect(this.page).toHaveTitle("Admin Login");
    };

    async loginAsAdmin(){
        await this.open();
        await this.isOnPage();
        await this.inputTextByLabel('Email', 'admin@gmail.com');
        await this.inputTextByLabel('Password', 'admin1234');
        await this.clickButtonByLabel("SIGN IN");
    }
};