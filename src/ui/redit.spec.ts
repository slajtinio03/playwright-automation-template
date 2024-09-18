import { test } from '@playwright/test';
import RedditPage from './pages/reddit.page'
import * as data from '../data/gsiteData.json'

let redditPage: any, page:any;

test.describe('Gsite Test Cases', () => {
    test.beforeEach(async ({ browser }) => {
        //Launch URL
        const context = await browser.newContext();
        page = await context.newPage();
        redditPage = new RedditPage(page);
    });

    test.only('Test Case 2', async ({}) => {
        //Step 1 - Launch Gsite Application
        await redditPage.goToRedditSite()
        //Step 2 - 
        await redditPage.loginToReddit(data.test_email, data.test_password )
        //create website
        // await redditPage.createWebsite();




    });

    test.setTimeout(50000);
});

