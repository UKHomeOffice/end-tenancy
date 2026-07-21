import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhenDidTenancyStartPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerWhenDidTenancyStart(date: string): Promise<void> {
    await this.enterDateForField('tenancy-start', date);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('When did the tenancy start? – Ending a tenancy due to immigration status');
  }
}
