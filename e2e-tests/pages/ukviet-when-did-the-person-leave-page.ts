import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhenDidThePersonLeavePage extends basePage {
  private person = '';

  constructor(page: Page) {
    super(page);
  }

  personToLeave(person: string): void {
    this.person = person;
  }

  async answerWhenDidThePersonLeave(date: string): Promise<void> {
    await this.enterDateForField('date-left', date);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle(`When did ${this.person} leave? – Ending a tenancy due to immigration status`);
  }
}
