import { expect, Locator, Page } from '@playwright/test';

export class basePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly errorSummaryTitle: Locator;
  readonly errorSummaryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator("input[value='Continue']");
    this.errorSummaryTitle = page.locator('#error-summary-title');
    this.errorSummaryList = page.locator('.govuk-error-summary__list');
  }

  async assertPageTitle(title: string): Promise<void> {
    const actual = await this.page.title();
    const expected = `${title} – GOV.UK`;

    if (actual.startsWith('Error: ')) {
      await expect(this.page).toHaveTitle(`Error: ${expected}`);
      return;
    }

    await expect(this.page).toHaveTitle(expected);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async clickContinueButton(): Promise<void> {
    if (await this.continueButton.count()) {
      await this.continueButton.click();
      return;
    }

    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async clickSubmitOrConfirmSubmissionButton(): Promise<void> {
    const submitInput = this.page.locator("input[value='Submit']");
    const confirmSubmissionInput = this.page.locator("input[value='Confirm submission']");

    var count = await submitInput.count();
    if (count) {
      await submitInput.click();
      return;
    }

    await confirmSubmissionInput.click();
  }

  async selectRadioByLabel(label: string): Promise<void> {
    await this.page.getByRole('radio', { name: label, exact: true }).check();
  }

  async selectCheckboxByLabel(label: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: label, exact: false }).check();
  }

  async enterDateForField(fieldKey: string, date: string): Promise<void> {
    const [day, month, year] = date.split('/');

    await this.page.locator(`#${fieldKey}-day`).fill(day);
    await this.page.locator(`#${fieldKey}-month`).fill(month);
    await this.page.locator(`#${fieldKey}-year`).fill(year);
  }

  async fillAddress(prefix: '' | 'landlord-' | 'agent-', addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.page.locator(`#${prefix}building`).fill(addressLine1);
    await this.page.locator(`#${prefix}street`).fill(addressLine2);
    await this.page.locator(`#${prefix}townOrCity`).fill(town);
    await this.page.locator(`#${prefix}postcode`).fill(postcode);
  }

  async getErrorSummaryHeaderText(): Promise<string> {
    const raw = await this.errorSummaryTitle.textContent();
    return (raw ?? '').trim();
  }

  async getErrorSummaryListText(): Promise<string[]> {
    const raw = await this.errorSummaryList.textContent();

    return (raw ?? '')
      .replaceAll('\t', '')
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);
  }

  async selectCountryFromAutocomplete(fieldId: string, value: string): Promise<void> {
    const input = this.page.locator(`#${fieldId}`);

    await input.fill(value);
    await input.press('ArrowDown');
    await input.press('Enter');
  }
}


export function convertDateWithOrdinalSuffix(date: string): string {
  const [dayRaw, monthRaw, yearRaw] = date.split('/').map(v => Number(v));
  const parsed = new Date(Date.UTC(yearRaw, monthRaw - 1, dayRaw));

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date provided: ${date}`);
  }

  const day = parsed.getUTCDate();
  const monthYear = parsed.toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return `${day}${getOrdinal(day)} ${monthYear}`;
}

function getOrdinal(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
