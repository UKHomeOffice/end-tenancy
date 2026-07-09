import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietNameOfNextPersonWhoLeftPptyPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameOfNextPersonToCheck(fullName: string): Promise<void> {
    await this.page.locator('#name').fill(fullName);
    await this.clickContinueButton();
  }

  async isTenantDetailAdded(tenantStatus: string): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: tenantStatus }).isVisible();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What’s the name of the next person who left the property? – Ending a tenancy due to immigration status');
  }
}
