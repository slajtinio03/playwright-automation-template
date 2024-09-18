import { Locator, Page, expect } from '@playwright/test';
import {textContent, textSearch,washington, gsiteTitle, urlGsite, shortPauseTime} from  '../../data/gsiteData.json'
// import * as data from  '../../data/gsiteData.json'

export default class GsitePage {
    page: Page;
    // LOCATORS
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly nextButton: Locator;
    readonly sites:Locator;



    constructor(page: Page) {
        this.page = page;
        this.emailTextBox = page.locator(`//div//input[@type='email']`);
        this.passwordTextBox = page.locator(`//div//input[@type='password']`);
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.sites = page.locator(``);



    }
    async goToGsite()
    {
        await this.page.goto(urlGsite)
        await this.page.waitForLoadState('domcontentloaded')
        while(await this.emailTextBox.isHidden())
        {
            await this.page.waitForTimeout(shortPauseTime)
        }
    }


    async loginToGsite(email: string, password: string) {

        //Enter Email
        await this.emailTextBox.waitFor({ state: 'visible' });
        await this.emailTextBox.fill(email);
        await expect(this.nextButton).toBeVisible({ timeout: 5000 });
        await this.nextButton.click();
        await this.page.waitForTimeout(5000);

        //Enter Password
        await this.passwordTextBox.waitFor({ state: 'visible' });
        await this.passwordTextBox.fill(password);
        await expect(this.nextButton).toBeVisible({ timeout: 5000 });
        await this.nextButton.click();
        await this.page.waitForTimeout(5000);
    }

    async createWebsite()
    {
        //Click on Sites
        await this.page.locator(`//img[contains(@src,'blank-googlecolors.png')]`).waitFor({state:'visible'});
        await this.page.locator(`//img[contains(@src,'blank-googlecolors.png')]`).click();
        await this.page.waitForLoadState('load');

        //Rename the title
        await expect(this.page.locator(`label[for='i5']`)).toBeVisible();
        await this.page.locator(`label[for='i5']`).fill(gsiteTitle);


        //Populate the Blank Sheet Title
        await this.page.locator(`//div[@role='textbox']`).click();
        await this.page.keyboard.press("Control+A");
        await this.page.keyboard.press("Delete");
        await this.page.keyboard.type("Anti Detect Browser");

        //Click Text and Populate it
        await this.page.locator(`//div[@aria-label='Text box']`).click();
        await this.page.locator(`//div[@role='textbox']//p`).click();
        await this.page.keyboard.type(textContent);

        //Click Youtube
        await this.page.locator(`//div[@role='menu'][2]//span[contains(.,"YouTube")]`).click();
        await this.page.waitForLoadState('load');
        const iframe = this.page.frameLocator(`//iframe`).last();
        await iframe.locator(`//input[@aria-label='Search all of YouTube or paste URL'] | //input[@aria-label="Search terms"]`).click();
        await this.page.keyboard.type(textSearch);
        await this.page.keyboard.press("Enter");
        await this.page.waitForLoadState('load');
        await iframe.locator(`//div[@role='option'][1]`).click();
        await iframe.getByRole('button', { name: 'Select' }).click();

        //Click Map
        await this.page.locator(`//div[@role='menu'][2]//span[contains(.,"Map")]`).click();
        await this.page.waitForLoadState('load');
        const iframe2 = this.page.frameLocator(`//iframe`).last();
        await expect(iframe2.locator(`//form//input[@placeholder='Enter a location']`)).toBeVisible({timeout:5000});
        await iframe2.locator(`//form//input[@placeholder='Enter a location']`).click();
        await this.page.keyboard.type(washington);
        await this.page.waitForTimeout(3000);
        await expect(iframe2.locator(`//div[@class='pac-item']`).first()).toBeVisible();
        await iframe2.locator(`//div[@class='pac-item']`).first().click();
        await iframe2.getByRole('button', { name: 'Select' }).click();
        await this.page.waitForTimeout(3000);
        
        //Publish
        await this.page.locator(`//span[text()="Publish"]`).click();
        await this.page.waitForLoadState('load');
        await expect(this.page.locator(`//input[@class='poFWNe zHQkBf']`)).toBeVisible();
        await this.page.locator(`//input[@class='poFWNe zHQkBf']`).click(); 
        //Generate Unique Name
        while(await this.page.getByRole('button', { name: 'Publish' }).last().isDisabled()){
            let randomnum = Math.floor(Math.random() * 100)
            let uniqueAntiDetectName = "Gsite" + Math.random().toString() + randomnum
            console.log(uniqueAntiDetectName)
            uniqueAntiDetectName = uniqueAntiDetectName.replace('.', "")
            console.log(uniqueAntiDetectName)
            await this.page.keyboard.type(uniqueAntiDetectName);
            await this.page.waitForTimeout(shortPauseTime);
            if(await this.page.getByRole('button', { name: 'Publish' }).last().isEnabled())
            {
                await this.page.getByRole('button', { name: 'Publish' }).last().click();
            }
            await this.page.keyboard.press("Control+A");
            await this.page.keyboard.press("Delete");
        }
    }
}
