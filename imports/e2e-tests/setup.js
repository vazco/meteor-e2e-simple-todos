import {setup} from 'meteor/universe:e2e';

// Setup testing environment
// Should be called as early as possible
setup({
    mocha: {
        // Example customization of mocha settings
        reporter: 'spec'
    },
    browser: {
        launchOptions: {
            // Change puppeteer launch settings
            slowMo: 10
        }
    }
}).catch(console.error);
