const {MasterPage} = require('./master-page');
const {expect} = require('@playwright/test');

exports.DashboardPage= class DashboardPage extends MasterPage {
    logoTextXpath ="//div[contains(concat(' ',@class,' '),' logo ') and .//text()[normalize-space()='EVERSHOP']]";

    constructor(page){
        super(page);
    };

    async isOnPage(){
        await expect(this.page.locator(this.logoTextXpath)).toBeVisible();
    };
}