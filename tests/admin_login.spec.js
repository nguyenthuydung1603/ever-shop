const { test, expect } = require('@playwright/test');
import * as allure from "allure-js-commons";

async function inputTextByLabel(label, value, page){
  let inputXpath = `(//label[./text()[normalize-space()='${label}']]/following::input)[1]`;
  await page.locator(inputXpath).fill(value);
};

async function inputTextByLabelStep(label, value, page){
  await allure.step(`User input ${label}: ${value}`, async() =>{
    await inputTextByLabel(label, value, page);
  });
};

test('Verify admin login succesfully', async ({ page }) => {
  let pageUrl='http://localhost:3000/admin/login';
  await allure.step(`I go to URL: ${pageUrl}`, async()=>{
    await page.goto(pageUrl);
  });
  await allure.step(`User should be on page Admin Login`, async() =>{
    await expect(page).toHaveTitle("Admin Login");
  });
  await inputTextByLabelStep('Email', "admin@gmail.com", page);
  await inputTextByLabelStep('Password', "admin1234", page);
  let buttonLabel = "SIGN IN"
  await allure.step(`Then user click button: ${buttonLabel}`, async() =>{
    let signInButtonXpath ="//button[.//text()[normalize-space()='SIGN IN']]";
    await page.locator(signInButtonXpath).click();
  });
  await allure.step(`User should be on page Dashboard`, async()=>{
    let logoTextXpath ="//div[contains(concat(' ',@class,' '),' logo ') and .//text()[normalize-space()='EVERSHOP']]";
    await expect (page.locator(logoTextXpath)).toBeVisible();
  })
});