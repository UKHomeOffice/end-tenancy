import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietNameOfPersonWhoLeftPptyPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerEnterNameOfPersonWhoLeft(fullName: string): Promise<void> {
    await this.page.locator('#name').fill(fullName);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the name of the person who left the property? – Ending a tenancy due to immigration status');
  }
}
