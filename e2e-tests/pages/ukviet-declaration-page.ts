import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ukvietDeclarationPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async submitForm(): Promise<void> {
    await this.clickSubmitOrConfirmSubmissionButton();
  }

  async checkRequestSentTextIsDisplayed(): Promise<boolean> {
    return this.page
      .getByRole('heading', { level: 1, name: 'Your request has been sent' })
      .isVisible();
  }

  async checkPersonDisRequestSentIsDisplayed(): Promise<boolean> {
    return this.page
      .getByRole('heading', {
        level: 1,
        name: 'Your request to check if a person is still disqualified from renting has been sent.',
      })
      .isVisible();
  }

  async checkReportPersonDisRequestSentIsDisplayed(): Promise<boolean> {
    return this.page
      .getByRole('heading', {
        level: 1,
        name: 'Thank you for letting us know that a disqualified person has left your property.',
      })
      .isVisible();
  }

  async requestNoticeNavigateToHomePage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Request another Notice of Letting to a Disqualified Person' }).click();
  }

  async checkDisqPersonNavigateToHomePage(): Promise<void> {
    await this.page
      .getByRole('link', { name: 'Check if someone named on a different Notice of Letting to a Disqualified Person' })
      .click();
  }

  async reportSomeoneElseNavigateToHomePage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Report that someone else' }).click();
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Declaration – Ending a tenancy due to immigration status');
  }
}
