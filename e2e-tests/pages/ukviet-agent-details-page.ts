import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietAgentDetailsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerAgentDetails(fullName: string, companyName: string, email: string, phoneNo: string): Promise<void> {
    await this.page.locator('#agent-name').fill(fullName);
    await this.page.locator('#agent-company').fill(companyName);
    await this.page.locator('#agent-email-address').fill(email);
    await this.page.locator('#agent-phone-number').fill(phoneNo);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Agent details – Ending a tenancy due to immigration status');
  }
}
