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
};