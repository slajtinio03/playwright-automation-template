import { Locator, Page, expect } from '@playwright/test';
import * as data from  '../../data/redditData.json'

export default class RedditPage {
    page: Page;
    // LOCATORS
    readonly loginButton: Locator;
    readonly loginButtonOnModal: Locator;
    readonly emailOrUsernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly userAgreement: Locator;
    readonly avatarIcon: Locator;
    readonly searchTextBox: Locator;
    readonly searchResults: Locator;


    constructor(page: Page) {
        this.page = page;
        //Login Page Locators
        this.loginButton = page.locator(`//a[@id='login-button']`)
        this.emailOrUsernameTextBox = page.locator(`//input[@id="login-username"]`);
        this.passwordTextBox = page.locator(`//input[@id="login-password"]`);
        this.avatarIcon = page.locator(`//button[@id='expand-user-drawer-button']`)
        this.loginButtonOnModal = page.getByRole('button', { name: 'Log In' })
        this.userAgreement = page.locator(`//a[contains(@href, 'user-agreement')]`)
        //Home Page Locator
        this.avatarIcon = page.locator(`//button[@id='expand-user-drawer-button']`)
        this.searchTextBox = page.locator(`input[placeholder='Search Reddit']`)
        this.searchResults = page.locator(`//reddit-feed[@class='nd:hidden false']//h2//a`)
    }
    
    async goToRedditSite(){
        await this.page.goto(data.redditUrl)
        await this.page.waitForLoadState('domcontentloaded')
        while(await this.userAgreement.isHidden())
        {
            await this.page.waitForTimeout(data.shortPauseTime)
        }
    }

    async loginToReddit(email: string, password: string) {

        //Initial Login Button
        await this.loginButton.click()

        //Enter Email
        await this.emailOrUsernameTextBox.waitFor({ state: 'visible' });
        await this.emailOrUsernameTextBox.fill(email);

        //Enter Password
        await this.passwordTextBox.waitFor({ state: 'visible' });
        await this.passwordTextBox.fill(password);
        await this.page.waitForTimeout(5000);

        await this.loginButtonOnModal.isEnabled()
        await this.loginButtonOnModal.click()
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.avatarIcon).toBeVisible() //assertion for successul login
    }

    async searchAndOpenFirstTopic(searchText:string)
    {
        await this.searchTextBox.fill(searchText)
        await this.page.keyboard.press("Enter")
        await this.page.waitForLoadState('networkidle')
        await this.searchResults.first().click()
    }
}
