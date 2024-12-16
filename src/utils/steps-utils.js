import * as allure from "allure-js-commons";

export async function iStep(stepName, action){
    await allure.step(stepName, async() =>{
        await action;
    })
}