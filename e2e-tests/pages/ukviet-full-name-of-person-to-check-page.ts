import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietFullNameOfPersonToCheckPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameOfPersonToCheck(fullName: string): Promise<void> {
    await this.page.locator('#name').fill(fullName);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the full name of the person that you’d like to check? – Ending a tenancy due to immigration status');
  }
}
