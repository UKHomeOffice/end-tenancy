import { ConstantsLib as c } from './constants-lib';

export type UkvietJourney =
  | typeof c.REQUEST_NOTICE
  | typeof c.CHECK_PERSON_IS_DISQUALIFIED
  | typeof c.REPORT_DISQUALIFIED_PERSON;

export type UkvietScenarioData = {
  scenarioId: string;
  description: string;
  whatDoYouWantToDo: UkvietJourney;
  whenDidTheTenancyStart: string | null;
  areThereOtherDisqualifiedTenants: 'Yes' | 'No' | null;
  whoAreYou: 'Landlord' | 'Agent';
  whatIsYourAddress: 'Your Address' | 'Use Property Address';
  noticeDateToDisqualifiedPerson: string | null;
  whenDidTenantLeave: string | null;
  checkAnyoneElseDisqualified: 'Yes' | 'No' | null;
  anyoneElseDisqualifiedLeftProperty: 'Yes' | 'No' | null;
};

export function getUkvietScenarioData(scenarioId: string, description: string): UkvietScenarioData {
  const data = getByScenarioId(scenarioId);

  // Selenium selected the row by scenario id; keep the same behavior in Playwright.
  // Description remains available for readability in the feature files.
  void description;

  return data;
}

function getByScenarioId(scenarioId: string): UkvietScenarioData {
  switch (scenarioId) {
    case '1':
      return {
        scenarioId: '1',
        description: 'Request a notice - Multiple tenants - Landlord',
        whatDoYouWantToDo: c.REQUEST_NOTICE,
        whenDidTheTenancyStart: '11/11/2014',
        areThereOtherDisqualifiedTenants: 'Yes',
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: null,
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '2':
      return {
        scenarioId: '2',
        description: 'Request a notice - Single tenant - Agent',
        whatDoYouWantToDo: c.REQUEST_NOTICE,
        whenDidTheTenancyStart: '12/11/2014',
        areThereOtherDisqualifiedTenants: 'No',
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: null,
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '3':
      return {
        scenarioId: '3',
        description: 'Request a notice - Single tenant - Landlord',
        whatDoYouWantToDo: c.REQUEST_NOTICE,
        whenDidTheTenancyStart: '13/11/2014',
        areThereOtherDisqualifiedTenants: 'Yes',
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: null,
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '4':
      return {
        scenarioId: '4',
        description: 'Disqualified person left property - Multiple tenants - Checking Agent',
        whatDoYouWantToDo: c.CHECK_PERSON_IS_DISQUALIFIED,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: '07/04/2014',
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: 'No',
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '5':
      return {
        scenarioId: '5',
        description: 'Report disqualified person left property  - Multiple tenants - Agent',
        whatDoYouWantToDo: c.CHECK_PERSON_IS_DISQUALIFIED,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: '04/04/2014',
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: 'Yes',
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '6':
      return {
        scenarioId: '6',
        description: 'Request a notice - Multiple tenants - Agent',
        whatDoYouWantToDo: c.CHECK_PERSON_IS_DISQUALIFIED,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: '05/04/2014',
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: 'No',
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '7':
      return {
        scenarioId: '7',
        description: 'Disqualified person left property - Multiple tenants - Checking Landlord',
        whatDoYouWantToDo: c.CHECK_PERSON_IS_DISQUALIFIED,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: '06/04/2014',
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: 'Yes',
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '8':
      return {
        scenarioId: '8',
        description: 'Disqualified person left property - Single tenant - Checking Agent',
        whatDoYouWantToDo: c.CHECK_PERSON_IS_DISQUALIFIED,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: '07/04/2014',
        whenDidTenantLeave: null,
        checkAnyoneElseDisqualified: 'No',
        anyoneElseDisqualifiedLeftProperty: null,
      };
    case '9':
      return {
        scenarioId: '9',
        description: 'Disqualified person left property - Single tenant - Checking Landlord',
        whatDoYouWantToDo: c.REPORT_DISQUALIFIED_PERSON,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: '04/04/2014',
        whenDidTenantLeave: '12/12/2024',
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: 'Yes',
      };
    case '10':
      return {
        scenarioId: '10',
        description: 'Report disqualified person left property - Single tenant - Landlord',
        whatDoYouWantToDo: c.REPORT_DISQUALIFIED_PERSON,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Your Address',
        noticeDateToDisqualifiedPerson: '05/04/2014',
        whenDidTenantLeave: '13/12/2024',
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: 'No',
      };
    case '11':
      return {
        scenarioId: '11',
        description: 'Report disqualified person left property - Multiple tenants - Landlord',
        whatDoYouWantToDo: c.REPORT_DISQUALIFIED_PERSON,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Agent',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: '06/04/2014',
        whenDidTenantLeave: '14/12/2024',
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: 'Yes',
      };
    case '12':
      return {
        scenarioId: '12',
        description: 'Report disqualified person left property - Single tenant - Agent',
        whatDoYouWantToDo: c.REPORT_DISQUALIFIED_PERSON,
        whenDidTheTenancyStart: null,
        areThereOtherDisqualifiedTenants: null,
        whoAreYou: 'Landlord',
        whatIsYourAddress: 'Use Property Address',
        noticeDateToDisqualifiedPerson: '07/04/2014',
        whenDidTenantLeave: '15/12/2024',
        checkAnyoneElseDisqualified: null,
        anyoneElseDisqualifiedLeftProperty: 'No',
      };
    default:
      throw new Error(`No test data found for scenario id: ${scenarioId}`);
  }
}

export function getJourneyOptionLabel(journey: UkvietJourney): string {
  switch (journey) {
    case c.REQUEST_NOTICE:
      return 'Request a Notice of Letting to a Disqualified Person from the Home Office';
    case c.CHECK_PERSON_IS_DISQUALIFIED:
      return 'Check if a person living in your property is still disqualified from renting';
    case c.REPORT_DISQUALIFIED_PERSON:
      return 'Report that a disqualified person has left your property';
    default:
      throw new Error(`Unknown journey: ${journey}`);
  }
}

export function getWhoAreYouOptionLabel(who: 'Landlord' | 'Agent'): string {
  return who === 'Landlord' ? 'Landlord' : 'Agent acting on behalf of a landlord';
}
