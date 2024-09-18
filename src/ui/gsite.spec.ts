import { test } from '@playwright/test';
import GsitePage from './pages/gsite.page'
import * as data from '../data/gsiteData.json'

let gsitePage: any, page:any;

test.describe('Gsite Test Cases', () => {
    test.beforeEach(async ({ browser }) => {
        //Launch URL
        const context = await browser.newContext();
        page = await context.newPage();
        gsitePage = new GsitePage(page);
    });

    test('Test Case 1', async ({}) => {
        //Step 1 - Launch Gsite Application
        await gsitePage.goToGsite()
        //Step 2 - Log in using valid credentials
        await gsitePage.loginToGsite(data.test_email, data.test_password )
        //Step 3 - Create Website
        await gsitePage.createWebsite();
    });

    test.setTimeout(50000);
});

