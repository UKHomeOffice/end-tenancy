import { expect, Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietConfirmationPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async assertAlertText(text: string): Promise<void> {
    await expect(this.page.getByRole('heading', { level: 1, name: text })).toBeVisible();
  }
}
