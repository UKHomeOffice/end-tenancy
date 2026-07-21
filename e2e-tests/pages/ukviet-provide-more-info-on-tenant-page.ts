import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietProvideMoreInfoOnTenantPage extends basePage {
  private personName = '';

  constructor(page: Page) {
    super(page);
  }

  personDisqualified(name: string): void {
    this.personName = name;
  }

  async answerProvideRentalInfo(dob: string, country: string): Promise<void> {
    await this.selectCheckboxByLabel('Date of birth');
    await this.enterDateForField('date-of-birth', dob);
    await this.selectCheckboxByLabel('Nationality');
    await this.selectCountryFromAutocomplete('nationality', country);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle(`Can you provide more information on ${this.personName}? – Ending a tenancy due to immigration status`);
  }
}
