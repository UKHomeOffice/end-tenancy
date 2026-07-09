import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietHomePageWhatDoYouWantToDoPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async openUkvietHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async acceptCookies(): Promise<void> {
    const acceptButton = this.page.getByRole('button', { name: 'Accept additional cookies' });
    const hideButton = this.page.getByRole('button', { name: 'Hide this message' });

    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }

    if (await hideButton.isVisible().catch(() => false)) {
      await hideButton.click();
    }
  }

  async selectAJourney(journey: string): Promise<void> {
    await this.selectRadioByLabel(journey);
    await this.clickContinueButton();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('What do you want to do? – Ending a tenancy due to immigration status');
  }
}
