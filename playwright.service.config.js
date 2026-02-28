import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import config from './playwright.config.js'; // Make sure the extension `.js` is used

export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true
  }),
  {
    reporter: [['list'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);

