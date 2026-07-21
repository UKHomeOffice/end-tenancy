import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietWhatIsTheAddressOfRentalPptyPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerRenterAddress(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.fillAddress('', addressLine1, addressLine2, town, postcode);
    await this.clickContinueButton();
  }

  async assertPageTitleForRequestOrCheck(): Promise<void> {
    await super.assertPageTitle('What’s the address of the rental property? – Ending a tenancy due to immigration status');
  }

  async assertPageTitleForReport(): Promise<void> {
    await super.assertPageTitle('What’s the address of the property the person has left? – Ending a tenancy due to immigration status');
  }
}
