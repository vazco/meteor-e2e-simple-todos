import {Meteor} from 'meteor/meteor';
import faker from 'faker';

import {
    describe,
    it,
    before,
    page,
    setValue,
    resizeWindow
} from '../helpers';

describe('Registration', () => {
    before(async () => {
        // Navigate to home page
        await page.goto(Meteor.absoluteUrl());

        // Resize window to some reasonable size (may fail)
        await resizeWindow({page}, 800, 600).catch(() => {});
    });

    it('should open login form', async () => {
        await page.waitFor('#login-sign-in-link', {timeout: 1000});
        await page.click('#login-sign-in-link');
        await page.waitFor('.login-form.login-password-form', {timeout: 1000});
    });

    it('should open register form', async () => {
        await page.click('#signup-link');

        // We assume that this is register a form when there is a "Repeat password" field
        await page.waitFor('#login-password-again', {timeout: 1000});
    });

    it('should fill and send register form', async () => {
        const password = faker.internet.password();

        await page.type('#login-username', faker.internet.userName());
        await page.type('#login-password', password);
        await page.type('#login-password-again', password);
        await page.click('#login-buttons-password');
    });

    it('should be logged in', async () => {
        // Execute function in browser context
        await page.waitFor(() => Meteor.user() !== null, {timeout: 2000});
    });
});
