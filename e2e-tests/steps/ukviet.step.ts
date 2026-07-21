import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import {
  getJourneyOptionLabel,
  getUkvietScenarioData,
  getWhoAreYouOptionLabel,
  UkvietScenarioData,
} from '../utility-helper/ukviet-test-data';
import { convertDateWithOrdinalSuffix } from '../pages/base-page';

export const { Given, When, Then } = createBdd(test);

let selectedScenario: UkvietScenarioData;

Given('Test data has been created for {string} scenarios', async ({}, product: string) => {
  if (product.toUpperCase() !== 'UKVIET') {
    throw new Error(`Unsupported product: ${product}`);
  }
});

Given('I selected the data for scenario {string} - {string}', async ({}, scenarioId: string, description: string) => {
  selectedScenario = getUkvietScenarioData(scenarioId, description);
});

When('I visit the Ukviet ending of tenancy page', async ({ pages }) => {
  await visitUkvietStartPage(pages);
});

When('I fill out my answers for the Ukviet questionnaire', async ({ pages }) => {
  ensureScenarioSelected();

  await selectJourneyProvideIssueDatePropertyAddressAndDetailsOfDisqualifiedPerson(pages, selectedScenario);
  await completeLandlordOrAgentDetailsAndSubmitForm(pages, selectedScenario);
});

Then('I check my answers for Ukviet - {string}', async ({ pages }, description: string) => {
  ensureScenarioSelected();
  void description;
  await pages.ukvietCheckYourAnswersPage.assertPageTitle();
  await pages.ukvietCheckYourAnswersPage.assertSectionsForJourney(selectedScenario.whatDoYouWantToDo);
});

Then('I am able to submit the Ukviet questionnaire', async ({ pages }) => {
  ensureScenarioSelected();

  if (selectedScenario.whatDoYouWantToDo === c.REQUEST_NOTICE) {
    await pages.ukvietCheckYourAnswersPage.answerContinueToDeclaration();
    await pages.ukvietDeclarationPage.assertPageTitle();
    await pages.ukvietDeclarationPage.submitForm();
    await pages.ukvietConfirmationPage.assertAlertText('Your request has been sent');
    return;
  }

  await pages.ukvietCheckYourAnswersPage.answerConfirmReportSubmission();

  if (selectedScenario.whatDoYouWantToDo === c.CHECK_PERSON_IS_DISQUALIFIED) {
    await pages.ukvietConfirmationPage.assertAlertText(
      'Your request to check if a person is still disqualified from renting has been sent.'
    );
    return;
  }

  await pages.ukvietConfirmationPage.assertAlertText(
    'Thank you for letting us know that a disqualified person has left your property.'
  );
});

Then('I am able to navigate back to home page', async ({ pages }) => {
  ensureScenarioSelected();

  switch (selectedScenario.whatDoYouWantToDo) {
    case c.REQUEST_NOTICE:
      await pages.ukvietDeclarationPage.requestNoticeNavigateToHomePage();
      break;
    case c.CHECK_PERSON_IS_DISQUALIFIED:
      await pages.ukvietDeclarationPage.checkDisqPersonNavigateToHomePage();
      break;
    case c.REPORT_DISQUALIFIED_PERSON:
      await pages.ukvietDeclarationPage.reportSomeoneElseNavigateToHomePage();
      break;
    default:
      throw new Error(`Unsupported journey: ${selectedScenario.whatDoYouWantToDo}`);
  }

  await pages.ukvietHomePageWhatDoYouWantToDoPage.assertPageTitle();
});

Given('I change the tenancy start date to {string} and continue', async ({ pages }, expectedStartDate: string) => {
  await pages.ukvietCheckYourAnswersPage.answerChangeTenancyStartDate();
  await pages.ukvietWhenDidTenancyStartPage.assertPageTitle();
  await pages.ukvietWhenDidTenancyStartPage.answerWhenDidTenancyStart(expectedStartDate);
});

Given(
  'I check the tenancy start date is updated to {string} on the Check your answers page',
  async ({ pages }, expectedStartDate: string) => {
    await pages.ukvietCheckYourAnswersPage.assertPageTitle();
    const actual = await pages.ukvietCheckYourAnswersPage.getUpdatedTenancyStartDate();
    expect(actual).toEqual(convertDateWithOrdinalSuffix(expectedStartDate));
  }
);

Then('I see error message displayed for ukvi', async ({ pages }, expectedErrorMessage: string) => {
  const expectedMessages = toLines(expectedErrorMessage);
  const actual = await pages.basePage.getErrorSummaryListText();

  expect(actual).toEqual(expectedMessages);
});

Then('I see {string} error message displayed for ukvi', async ({ pages }, expectedErrorMessage: string) => {
  const actual = await pages.basePage.getErrorSummaryListText();
  expect(actual[0]).toEqual(expectedErrorMessage);
});

Then('I see {string} error header message displayed for ukvi', async ({ pages }, expectedErrorMessage: string) => {
  const actual = await pages.basePage.getErrorSummaryHeaderText();
  expect(actual).toEqual(expectedErrorMessage);
});

When('I select a Ukviet journey to start my application and click continue', async ({ pages }) => {
  await pages.ukvietHomePageWhatDoYouWantToDoPage.selectAJourney(getJourneyOptionLabel(c.REQUEST_NOTICE));
});

When('I enter address details and click continue', async ({ pages }) => {
  await pages.ukvietWhatIsTheAddressOfRentalPptyPage.answerRenterAddress(
    c.ADDRESS_LINE_1,
    c.ADDRESS_LINE_2,
    c.TOWN_OR_CITY,
    c.POSTCODE
  );
});

When('I enter tenancy start date {string} and click continue', async ({ pages }, date: string) => {
  await pages.ukvietWhenDidTenancyStartPage.answerWhenDidTenancyStart(date);
});

When("I enter the person's name and click continue", async ({ pages }) => {
  await pages.ukvietNameOfPersonDisqualifiedFromRentingPage.answerEnterNameOfPersonDisqualified(c.FULL_NAME);
});

When('I enter landlord address details and click continue', async ({ pages }) => {
  await pages.ukvietLandlordDetailsPage.answerLandlordDetails(
    c.LANDLORD_NAME,
    c.COMPANY_NAME,
    c.LANDLORD_EMAIL,
    c.TELEPHONE
  );
});

When('I select who you are {string} and click continue', async ({ pages }, whoAreYou: string) => {
  await pages.ukvietWhoAreYouPage.answerWhoAreYou(whoAreYou === c.AGENT ? 'Agent acting on behalf of a landlord' : c.LANDLORD);
});

When(
  'I select {string} to other tenants disqualified from renting the property and click continue',
  async ({ pages }, answer: 'Yes' | 'No') => {
    await pages.ukvietOtherDisqualifiedTenantsPage.answerYesOrNo(answer);
  }
);

When("I answer What's your address and click continue", async ({ pages }) => {
  await pages.ukvietWhatIsYourAddressPage.answerUsePptyAddressProvided();
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

When('I am on the Check your answers page', async ({ pages }) => {
  const isVisible = await pages.ukvietCheckYourAnswersPage.isCheckYourAnsHeaderTextDisplayed();
  expect(isVisible).toBe(true);
});

function ensureScenarioSelected(): void {
  if (!selectedScenario) {
    throw new Error('No Ukviet scenario selected. Use the scenario selection step first.');
  }
}

function toLines(textBlock: string): string[] {
  return textBlock
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}

async function visitUkvietStartPage(pages: { [key: string]: any }): Promise<void> {
  await pages.ukvietHomePageWhatDoYouWantToDoPage.openUkvietHomePage();
  await pages.ukvietHomePageWhatDoYouWantToDoPage.acceptCookies();
  await pages.ukvietHomePageWhatDoYouWantToDoPage.assertPageTitle();
}

async function selectJourneyProvideIssueDatePropertyAddressAndDetailsOfDisqualifiedPerson(
  pages: { [key: string]: any },
  scenario: UkvietScenarioData
): Promise<void> {
  await pages.ukvietHomePageWhatDoYouWantToDoPage.selectAJourney(
    getJourneyOptionLabel(scenario.whatDoYouWantToDo)
  );

  switch (scenario.whatDoYouWantToDo) {
    case c.REQUEST_NOTICE:
      await pages.ukvietWhatIsTheAddressOfRentalPptyPage.assertPageTitleForRequestOrCheck();
      await pages.ukvietWhatIsTheAddressOfRentalPptyPage.answerRenterAddress(
        c.ADDRESS_LINE_1,
        c.ADDRESS_LINE_2,
        c.TOWN_OR_CITY,
        c.POSTCODE
      );
      await pages.ukvietWhenDidTenancyStartPage.assertPageTitle();
      await pages.ukvietWhenDidTenancyStartPage.answerWhenDidTenancyStart(
        scenario.whenDidTheTenancyStart ?? c.TENANTS_MOVE_IN_DATE
      );
      await answerNameOfPersonDisqualified(pages);
      await answerOtherTenantsSamePptyDisqualified(pages, scenario);
      break;

    case c.CHECK_PERSON_IS_DISQUALIFIED:
      await pages.ukvietNoticeDateToDisqualifiedPersonPage.assertPageTitle();
      await pages.ukvietNoticeDateToDisqualifiedPersonPage.answerIssueDateForDisqualifiedPerson(
        scenario.noticeDateToDisqualifiedPerson ?? c.DISQUALIFIED_NOTICE_DATE
      );
      await pages.ukvietWhatIsTheAddressOfRentalPptyPage.assertPageTitleForRequestOrCheck();
      await pages.ukvietWhatIsTheAddressOfRentalPptyPage.answerRenterAddress(
        c.ADDRESS_LINE_1,
        c.ADDRESS_LINE_2,
        c.TOWN_OR_CITY,
        c.POSTCODE
      );
      await pages.ukvietFullNameOfPersonToCheckPage.assertPageTitle();
      await pages.ukvietFullNameOfPersonToCheckPage.answerNameOfPersonToCheck(c.B_FULL_NAME);
      await answerCheckAnyoneElseListedDisqualifiedNotice(pages, scenario);
      break;

    case c.REPORT_DISQUALIFIED_PERSON:
      await pages.ukvietNoticeDateToDisqualifiedPersonPage.assertPageTitle();
      await pages.ukvietNoticeDateToDisqualifiedPersonPage.answerIssueDateForDisqualifiedPerson(
        scenario.noticeDateToDisqualifiedPerson ?? c.DISQUALIFIED_NOTICE_DATE
      );
      await pages.ukvietAddressOfPptyPersonHasLeftPage.assertPageTitleForReport();
      await pages.ukvietAddressOfPptyPersonHasLeftPage.answerRenteralAddress(
        c.D_ADDRESS_LINE_1,
        c.D_ADDRESS_LINE_2,
        c.D_TOWN_OR_CITY,
        c.D_POSTCODE
      );
      await pages.ukvietNameOfPersonWhoLeftPptyPage.assertPageTitle();
      await pages.ukvietNameOfPersonWhoLeftPptyPage.answerEnterNameOfPersonWhoLeft(c.D_FULL_NAME);
      await answerWhenDidTenantLeave(
        pages,
        c.D_FULL_NAME,
        scenario.whenDidTenantLeave ?? c.TENANTS_MOVE_OUT_DATE
      );
      await answerAnyoneElseListedDisqualifiedNotice(pages, scenario);
      break;

    default:
      throw new Error(`Unsupported journey: ${scenario.whatDoYouWantToDo}`);
  }
}

async function answerNameOfPersonDisqualified(pages: { [key: string]: any }): Promise<void> {
  await pages.ukvietNameOfPersonDisqualifiedFromRentingPage.assertPageTitle();
  await pages.ukvietNameOfPersonDisqualifiedFromRentingPage.answerEnterNameOfPersonDisqualified(c.FULL_NAME);

  pages.ukvietProvideMoreInfoOnTenantPage.personDisqualified(c.FULL_NAME);
  await pages.ukvietProvideMoreInfoOnTenantPage.assertPageTitle();
  await pages.ukvietProvideMoreInfoOnTenantPage.answerProvideRentalInfo(c.DOB_1978, c.NATIONALITY);
}

async function answerOtherTenantsSamePptyDisqualified(
  pages: { [key: string]: any },
  scenario: UkvietScenarioData
): Promise<void> {
  await pages.ukvietOtherDisqualifiedTenantsPage.assertPageTitle();
  expect(await pages.ukvietOtherDisqualifiedTenantsPage.isTenantDetailAdded('Tenants')).toBe(true);

  if (scenario.areThereOtherDisqualifiedTenants === c.RESPONSE_YES) {
    await pages.ukvietOtherDisqualifiedTenantsPage.answerYesOrNo('Yes');
    await pages.ukvietNameOfNextPersonDisqualifiedPage.assertPageTitle();
    await pages.ukvietNameOfNextPersonDisqualifiedPage.answerNextPersonDisqualified(c.FULL_NAME);
    pages.ukvietProvideMoreInfoOnTenantPage.personDisqualified(c.FULL_NAME);
    await pages.ukvietProvideMoreInfoOnTenantPage.assertPageTitle();
    await pages.ukvietProvideMoreInfoOnTenantPage.answerProvideRentalInfo(c.DOB_1978, c.NATIONALITY);
    await pages.ukvietOtherDisqualifiedTenantsPage.answerYesOrNo('No');
    return;
  }

  await pages.ukvietOtherDisqualifiedTenantsPage.answerYesOrNo('No');
}

async function answerCheckAnyoneElseListedDisqualifiedNotice(
  pages: { [key: string]: any },
  scenario: UkvietScenarioData
): Promise<void> {
  await pages.ukvietCheckAnyoneElseDisqualifiedPage.assertPageTitle();
  expect(await pages.ukvietCheckAnyoneElseDisqualifiedPage.isTenantToCheckAdded('Tenants you are checking')).toBe(
    true
  );

  if (scenario.checkAnyoneElseDisqualified === c.RESPONSE_YES) {
    await pages.ukvietCheckAnyoneElseDisqualifiedPage.answerYesOrNo('Yes');
    await pages.ukvietFullNameOfNextPersonToCheckPage.assertPageTitle();
    expect(await pages.ukvietFullNameOfNextPersonToCheckPage.isTenantDetailAdded('Tenants you are checking')).toBe(
      true
    );
    await pages.ukvietFullNameOfNextPersonToCheckPage.answerNameOfNextPersonToCheck(c.C_FULL_NAME);
    await pages.ukvietCheckAnyoneElseDisqualifiedPage.answerYesOrNo('No');
    return;
  }

  await pages.ukvietCheckAnyoneElseDisqualifiedPage.answerYesOrNo('No');
}

async function answerAnyoneElseListedDisqualifiedNotice(
  pages: { [key: string]: any },
  scenario: UkvietScenarioData
): Promise<void> {
  await pages.ukvietAnyoneElseDisqualifiedWhoHasLeftPage.assertPageTitle();
  expect(await pages.ukvietAnyoneElseDisqualifiedWhoHasLeftPage.isTenantToCheckAdded('Tenants who have left')).toBe(
    true
  );

  if (scenario.anyoneElseDisqualifiedLeftProperty === c.RESPONSE_YES) {
    await pages.ukvietAnyoneElseDisqualifiedWhoHasLeftPage.answerYesOrNo('Yes');
    await pages.ukvietNameOfNextPersonWhoLeftPptyPage.assertPageTitle();
    expect(await pages.ukvietNameOfNextPersonWhoLeftPptyPage.isTenantDetailAdded('Tenants who have left')).toBe(
      true
    );
    await pages.ukvietNameOfNextPersonWhoLeftPptyPage.answerNameOfNextPersonToCheck(c.C_FULL_NAME);
    await answerWhenDidTenantLeave(pages, c.C_FULL_NAME, c.TENANTS_MOVE_OUT_DATE);
    await pages.ukvietAnyoneElseDisqualifiedWhoHasLeftPage.answerYesOrNo('No');
    return;
  }

  await pages.ukvietAnyoneElseDisqualifiedWhoHasLeftPage.answerYesOrNo('No');
}

async function answerWhenDidTenantLeave(
  pages: { [key: string]: any },
  tenantName: string,
  dateLeft: string
): Promise<void> {
  pages.ukvietWhenDidThePersonLeavePage.personToLeave(tenantName);
  await pages.ukvietWhenDidThePersonLeavePage.assertPageTitle();
  await pages.ukvietWhenDidThePersonLeavePage.answerWhenDidThePersonLeave(dateLeft);
}

async function completeLandlordOrAgentDetailsAndSubmitForm(
  pages: { [key: string]: any },
  scenario: UkvietScenarioData
): Promise<void> {
  await pages.ukvietWhoAreYouPage.assertPageTitle();
  await pages.ukvietWhoAreYouPage.answerWhoAreYou(getWhoAreYouOptionLabel(scenario.whoAreYou));

  if (scenario.whoAreYou === c.LANDLORD) {
    await pages.ukvietLandlordDetailsPage.assertPageTitle();
    await pages.ukvietLandlordDetailsPage.answerLandlordDetails(
      c.LANDLORD_NAME,
      c.COMPANY_NAME,
      c.CONTACT_EMAIL_ADDRESS,
      c.TELEPHONE
    );

    await pages.ukvietWhatIsYourAddressPage.assertPageTitle();

    if (scenario.whatIsYourAddress === c.YOUR_ADDRESS) {
      await pages.ukvietWhatIsYourAddressPage.answerEnterYourAddress(
        c.ADDRESS_LINE_1,
        c.ADDRESS_LINE_2,
        c.TOWN_OR_CITY,
        c.POSTCODE
      );
    } else {
      await pages.ukvietWhatIsYourAddressPage.answerUsePptyAddressProvided();
    }

    return;
  }

  await pages.ukvietAgentDetailsPage.assertPageTitle();
  await pages.ukvietAgentDetailsPage.answerAgentDetails(
    c.LAND_LORD_AGENT_NAME,
    c.COMPANY_NAME,
    c.CONTACT_EMAIL_ADDRESS,
    c.TELEPHONE
  );

  await pages.ukvietAgentsContactAddressPage.assertPageTitle();
  await pages.ukvietAgentsContactAddressPage.answerAgentContactAddress(
    c.B_ADDRESS_LINE_1,
    c.B_ADDRESS_LINE_2,
    c.B_TOWN_OR_CITY,
    c.B_POSTCODE
  );

  await pages.ukvietWhatIsTheLandlordNamePage.assertPageTitle();
  await pages.ukvietWhatIsTheLandlordNamePage.answerEnterNameOfLandlord(c.LANDLORD_NAME);

  await pages.ukvietWhatIsTheLandlordAddressPage.assertPageTitle();

  if (scenario.whatIsYourAddress === c.YOUR_ADDRESS) {
    await pages.ukvietWhatIsTheLandlordAddressPage.answerLandlordAddress(
      c.C_ADDRESS_LINE_1,
      c.C_ADDRESS_LINE_2,
      c.C_TOWN_OR_CITY,
      c.C_POSTCODE
    );
    return;
  }

  await pages.ukvietWhatIsTheLandlordAddressPage.answerUseRentalPptyAddressProvided();
}
