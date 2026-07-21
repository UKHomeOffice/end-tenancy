import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhatIsTheLandlordNamePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerEnterNameOfLandlord(name: string): Promise<void> {
    await this.page.locator('#landlord-name-agent').fill(name);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the landlord’s name? – Ending a tenancy due to immigration status');
  }
}
