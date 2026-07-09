import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietNoticeDateToDisqualifiedPersonPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerIssueDateForDisqualifiedPerson(date: string): Promise<void> {
    await this.enterDateForField('nldp-date', date);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What was the date of issue for the Notice of Letting to a Disqualified Person? – Ending a tenancy due to immigration status');
  }
}
