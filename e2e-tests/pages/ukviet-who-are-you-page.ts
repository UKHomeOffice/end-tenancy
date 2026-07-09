import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhoAreYouPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerWhoAreYou(answer: string): Promise<void> {
    await this.selectRadioByLabel(answer);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Who are you? – Ending a tenancy due to immigration status');
  }
}
