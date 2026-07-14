import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class ukvietCheckYourAnswersPage extends basePage {
  readonly checkYourAnswersHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.checkYourAnswersHeading = page.getByRole('heading', { level: 1, name: 'Check your answers' });
  }

  async getSectionName(header: string): Promise<string | null> {
    const section = this.page.getByRole('heading', { level: 2, name: header });

    if (!(await section.isVisible().catch(() => false))) {
      return null;
    }

    return (await section.textContent())?.trim() ?? null;
  }

  async answerConfirmReportSubmission(): Promise<void> {
    await this.page.locator('#declaration').check();
    await this.clickSubmitOrConfirmSubmissionButton();
  }

  async answerContinueToDeclaration(): Promise<void> {
    const button = this.page.locator("input[value='Continue to declaration']");

    if (await button.count()) {
      await button.click();
      return;
    }

    await this.page.getByRole('button', { name: 'Continue to declaration' }).click();
  }

  async answerChangeTenancyStartDate(): Promise<void> {
    await this.page.locator('a#tenancy-start-change').click();
  }

  async getUpdatedTenancyStartDate(): Promise<string> {
    const value = await this.page
      .locator('dt')
      .filter({ hasText: 'Tenancy start' })
      .locator('xpath=following-sibling::dd[1]')
      .first()
      .textContent();

    return (value ?? '').trim();
  }

  async isCheckYourAnsHeaderTextDisplayed(): Promise<boolean> {
    return this.checkYourAnswersHeading.isVisible();
  }

  async assertSectionsForJourney(journey: string): Promise<void> {
    const required: string[] = [c.KEY_DETAILS, c.LANDLORD_DETAILS];

    if (journey === c.REQUEST_NOTICE) {
      required.splice(1, 0, c.NOTICE_REQUESTED_FOR_DETAILS);
    }

    if (journey === c.CHECK_PERSON_IS_DISQUALIFIED) {
      required.push(c.TENANTS_YOU_ARE_CHECKING);
    }

    if (journey === c.REPORT_DISQUALIFIED_PERSON) {
      required.push(c.TENANTS_WHO_HAVE_LEFT);
    }

    for (const section of required) {
      const actual = await this.getSectionName(section);
      if (actual !== section) {
        throw new Error(`Section mismatch. Expected "${section}" but found "${actual}"`);
      }
    }
  }

  async assertPageTitle(): Promise<void> {
    await super.assertPageTitle('Check your answers – Ending a tenancy due to immigration status');
  }
}
