import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhatIsTheLandlordAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerLandlordAddress(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.fillAddress('landlord-', addressLine1, addressLine2, town, postcode);
    await this.clickContinueButton();
  }

  async answerUseRentalPptyAddressProvided(): Promise<void> {
    await this.page.locator('#use-previous-address').check();
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the landlord\'s address? – Ending a tenancy due to immigration status');
  }
}
