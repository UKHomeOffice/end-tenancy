import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const baseURL = process.env.PLAYWRIGHT_BASE_URL || `https://ending-a-tenancy.uat.internal.sas-notprod.homeoffice.gov.uk`;

const testDir = defineBddConfig({
    features: 'e2e-tests/features/**/*.feature',
    steps: ['e2e-tests/steps/**/*.step.ts', 'e2e-tests/fixture/fixtures.ts'],
    outputDir: '.features-gen',
});

export default defineConfig({
    testDir,
    timeout: 30000,
    expect: {
        timeout: 6000,
    },
    fullyParallel: true,
    workers: process.env.CI ? 2 : 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL,
        viewport: null,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        headless: false,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                launchOptions: {
                    args: ['--start-maximized'],
                },
                video: 'retain-on-failure', //Options => 'on', 'off', 'retain-on-failure' or 'on-first-retry'
                screenshot: 'only-on-failure', 
            },
        },
    ],
});