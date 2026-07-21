import { Page } from '@playwright/test';
import { ukvietWhatIsTheAddressOfRentalPptyPage } from './ukviet-what-is-the-address-of-rental-ppty-page';

export class ukvietAddressOfPptyPersonHasLeftPage extends ukvietWhatIsTheAddressOfRentalPptyPage {
  constructor(page: Page) {
    super(page);
  }

  async answerRenteralAddress(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.answerRenterAddress(addressLine1, addressLine2, town, postcode);
  }
}
