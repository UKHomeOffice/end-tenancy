import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietCheckAnyoneElseDisqualifiedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async isTenantToCheckAdded(tenantStatus: string): Promise<boolean> {
    return this.page.getByRole('heading', { level: 2, name: tenantStatus }).isVisible();
  }

  async answerYesOrNo(answer: 'Yes' | 'No'): Promise<void> {
    await this.selectRadioByLabel(answer);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Is there anyone else listed on the same Notice of Letting to a Disqualified Person that you’d like to check? – Ending a tenancy due to immigration status');
  }
}
