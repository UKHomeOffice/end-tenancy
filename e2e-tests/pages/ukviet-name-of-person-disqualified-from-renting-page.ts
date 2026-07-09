import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietNameOfPersonDisqualifiedFromRentingPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerEnterNameOfPersonDisqualified(fullName: string): Promise<void> {
    await this.page.locator('#name').fill(fullName);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the name of the person you think is disqualified from renting? – Ending a tenancy due to immigration status');
  }
}
