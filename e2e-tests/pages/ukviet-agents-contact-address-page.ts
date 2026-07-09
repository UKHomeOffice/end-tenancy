import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietAgentsContactAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerAgentContactAddress(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.fillAddress('agent-', addressLine1, addressLine2, town, postcode);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Agent’s contact address – Ending a tenancy due to immigration status');
  }
}
