import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietLandlordDetailsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerLandlordDetails(fullName: string, companyName: string, email: string, phoneNo: string): Promise<void> {
    await this.page.locator('#landlord-name').fill(fullName);
    await this.page.locator('#landlord-company').fill(companyName);
    await this.page.locator('#landlord-email-address').fill(email);
    await this.page.locator('#landlord-phone-number').fill(phoneNo);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Landlord details – Ending a tenancy due to immigration status');
  }
}
