import { config as baseConfig } from '../wdio.conf.js';

export const config = {
    ...baseConfig,
    capabilities: [{
        maxInstances: 2,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
            args: ['-headless', '--width=1920', '--height=1080']
        }
    }],
    services: ['geckodriver'],
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }]
    ]
};
