import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietOtherDisqualifiedTenantsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async isTenantDetailAdded(tenantStatus: string): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: tenantStatus }).isVisible();
  }

  async answerYesOrNo(answer: 'Yes' | 'No'): Promise<void> {
    await this.selectRadioByLabel(answer);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Are there other tenants at the same property who you think may also be disqualified from renting? – Ending a tenancy due to immigration status');
  }
}
