import {expect} from 'chai';
import faker from 'faker';

import {
    describe,
    it,
    before,
    page,
    setValue,
} from '../helpers';

describe('Tasks', () => {
    it('should have new task input', async () => {
        await page.waitFor('form.new-task input', {timeout: 1000});
    });

    it('should be possible to add new task', async () => {
        const text = faker.lorem.sentence();

        // Insert text into form and submit it
        await setValue({page}, 'form.new-task input', text);
        await page.keyboard.press('Enter');

        // Check (using XPath as an example) if a new task with this text will show up
        await page.waitForXPath(`//span[@data-test='task-text'][contains(.,'${text}')]`, {timeout: 1000});
    });

    it('should update counter', async () => {
        // Verify current counter state
        let counter = await page.$eval('[data-test="tasks-counter"]', el => +el.innerText);
        expect(counter).to.be.a('number');
        expect(counter).to.be.above(0);

        for (let i = 0; i < 3; i++) {
            // Insert new task
            await setValue({page}, 'form.new-task input', faker.lorem.sentence());
            await page.keyboard.press('Enter');

            // Wait for the counter to update
            await page.waitFor(
                counter => document.querySelector('[data-test="tasks-counter"]').innerText === counter,
                {timeout: 1000},
                `${++counter}`
            );
        }
    });

    it('should be marked as private', async () => {
        // Get first task handle
        const task = await page.$('[data-test="task-item"]:nth-child(1)');

        // There should not be a class name
        expect(await page.evaluate(task => task.className, task)).to.equal('');

        // Click button and mark as private
        await task.$('button.toggle-private').then(el => el.click());

        // There should be a private class right now
        expect(await page.evaluate(task => task.className, task)).to.equal('private');

        // Cleanup task reference
        await task.dispose();
    });

    it('should be marked as completed', async () => {
        // Get second task handle
        const task = await page.$('[data-test="task-item"]:nth-child(2)');

        // There should not be a class name
        expect(await page.evaluate(task => task.className, task)).to.equal('');

        // Click button and mark as private
        await task.$('input[type="checkbox"]').then(el => el.click());

        // There should be a checked class right now
        expect(await page.evaluate(task => task.className, task)).to.equal('checked');

        // Cleanup task reference
        await task.dispose();
    });

    it('should hide completed task', async () => {
        // Make sure there are completed tasks
        expect(await page.$$eval('li.checked[data-test="task-item"]', list => list.length)).to.be.above(0);

        await page.click('.hide-completed input[type="checkbox"]');

        // There should not be any completed tasks visible
        expect(await page.$$eval('li.checked[data-test="task-item"]', list => list.length)).to.equal(0);
    });

    it('should be removable', async () => {
        // Count number of tasks before the deletion
        const count = await page.$$eval('[data-test="task-item"]', list => list.length);

        // Remove first task
        await page.click('[data-test="task-item"] button.delete');

        // Count should be one less now
        expect(await page.$$eval('[data-test="task-item"]', list => list.length)).to.be.equal(count - 1);
    });
});
