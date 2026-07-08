import 'dotenv/config';
import { getEnvironmentConfig } from './configs/environments.js';

const env = process.env.TEST_ENV || 'prod';
const envConfig = getEnvironmentConfig(env);

const hub = process.env.HUB_URL ? new URL(process.env.HUB_URL) : null;

export const config = {
  runner: 'local',
  ...(hub && {
    protocol: hub.protocol.replace(':', ''), // http
    hostname: hub.hostname, // selenium-hub
    port: Number(hub.port) || 4444, // 4444
    path: hub.pathname, // /wd/hub
  }),
  specs: ['./test/specs/**/*.spec.js'],
  exclude: [],
  maxInstances: 3,

  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--window-size=1920,1080',
        ],
      },
    },
  ],

  logLevel: 'error',
  bail: 0,
  baseUrl: envConfig.baseUrl,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [],

  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
