import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { ukvietAddressOfPptyPersonHasLeftPage } from '../pages/ukviet-address-of-ppty-person-has-left-page';
import { ukvietAgentDetailsPage } from '../pages/ukviet-agent-details-page';
import { ukvietAgentsContactAddressPage } from '../pages/ukviet-agents-contact-address-page';
import { ukvietAnyoneElseDisqualifiedWhoHasLeftPage } from '../pages/ukviet-anyone-else-disqualified-who-has-left-page';
import { ukvietCheckAnyoneElseDisqualifiedPage } from '../pages/ukviet-check-anyone-else-disqualified-page';
import { ukvietCheckYourAnswersPage } from '../pages/ukviet-check-your-answers-page';
import { ukvietConfirmationPage } from '../pages/ukviet-confirmation-page';
import { ukvietDeclarationPage } from '../pages/ukviet-declaration-page';
import { ukvietFullNameOfNextPersonToCheckPage } from '../pages/ukviet-full-name-of-next-person-to-check-page';
import { ukvietFullNameOfPersonToCheckPage } from '../pages/ukviet-full-name-of-person-to-check-page';
import { ukvietHomePageWhatDoYouWantToDoPage } from '../pages/ukviet-home-page-what-do-you-want-to-do-page';
import { ukvietLandlordDetailsPage } from '../pages/ukviet-landlord-details-page';
import { ukvietNameOfNextPersonDisqualifiedPage } from '../pages/ukviet-name-of-next-person-disqualified-page';
import { ukvietNameOfNextPersonWhoLeftPptyPage } from '../pages/ukviet-name-of-next-person-who-left-ppty-page';
import { ukvietNameOfPersonDisqualifiedFromRentingPage } from '../pages/ukviet-name-of-person-disqualified-from-renting-page';
import { ukvietNameOfPersonWhoLeftPptyPage } from '../pages/ukviet-name-of-person-who-left-ppty-page';
import { ukvietNoticeDateToDisqualifiedPersonPage } from '../pages/ukviet-notice-date-to-disqualified-person-page';
import { ukvietOtherDisqualifiedTenantsPage } from '../pages/ukviet-other-disqualified-tenants-page';
import { ukvietProvideMoreInfoOnTenantPage } from '../pages/ukviet-provide-more-info-on-tenant-page';
import { ukvietWhatIsTheAddressOfRentalPptyPage } from '../pages/ukviet-what-is-the-address-of-rental-ppty-page';
import { ukvietWhatIsTheLandlordAddressPage } from '../pages/ukviet-what-is-the-landlord-address-page';
import { ukvietWhatIsTheLandlordNamePage } from '../pages/ukviet-what-is-the-landlord-name-page';
import { ukvietWhatIsYourAddressPage } from '../pages/ukviet-what-is-your-address-page';
import { ukvietWhenDidTenancyStartPage } from '../pages/ukviet-when-did-tenancy-start-page';
import { ukvietWhenDidThePersonLeavePage } from '../pages/ukviet-when-did-the-person-leave-page';
import { ukvietWhoAreYouPage } from '../pages/ukviet-who-are-you-page';

type Pages = {
  basePage: basePage;
  ukvietAddressOfPptyPersonHasLeftPage: ukvietAddressOfPptyPersonHasLeftPage;
  ukvietAgentDetailsPage: ukvietAgentDetailsPage;
  ukvietAgentsContactAddressPage: ukvietAgentsContactAddressPage;
  ukvietAnyoneElseDisqualifiedWhoHasLeftPage: ukvietAnyoneElseDisqualifiedWhoHasLeftPage;
  ukvietCheckAnyoneElseDisqualifiedPage: ukvietCheckAnyoneElseDisqualifiedPage;
  ukvietCheckYourAnswersPage: ukvietCheckYourAnswersPage;
  ukvietConfirmationPage: ukvietConfirmationPage;
  ukvietDeclarationPage: ukvietDeclarationPage;
  ukvietFullNameOfNextPersonToCheckPage: ukvietFullNameOfNextPersonToCheckPage;
  ukvietFullNameOfPersonToCheckPage: ukvietFullNameOfPersonToCheckPage;
  ukvietHomePageWhatDoYouWantToDoPage: ukvietHomePageWhatDoYouWantToDoPage;
  ukvietLandlordDetailsPage: ukvietLandlordDetailsPage;
  ukvietNameOfNextPersonDisqualifiedPage: ukvietNameOfNextPersonDisqualifiedPage;
  ukvietNameOfNextPersonWhoLeftPptyPage: ukvietNameOfNextPersonWhoLeftPptyPage;
  ukvietNameOfPersonDisqualifiedFromRentingPage: ukvietNameOfPersonDisqualifiedFromRentingPage;
  ukvietNameOfPersonWhoLeftPptyPage: ukvietNameOfPersonWhoLeftPptyPage;
  ukvietNoticeDateToDisqualifiedPersonPage: ukvietNoticeDateToDisqualifiedPersonPage;
  ukvietOtherDisqualifiedTenantsPage: ukvietOtherDisqualifiedTenantsPage;
  ukvietProvideMoreInfoOnTenantPage: ukvietProvideMoreInfoOnTenantPage;
  ukvietWhatIsTheAddressOfRentalPptyPage: ukvietWhatIsTheAddressOfRentalPptyPage;
  ukvietWhatIsTheLandlordAddressPage: ukvietWhatIsTheLandlordAddressPage;
  ukvietWhatIsTheLandlordNamePage: ukvietWhatIsTheLandlordNamePage;
  ukvietWhatIsYourAddressPage: ukvietWhatIsYourAddressPage;
  ukvietWhenDidTenancyStartPage: ukvietWhenDidTenancyStartPage;
  ukvietWhenDidThePersonLeavePage: ukvietWhenDidThePersonLeavePage;
  ukvietWhoAreYouPage: ukvietWhoAreYouPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      ukvietAddressOfPptyPersonHasLeftPage: new ukvietAddressOfPptyPersonHasLeftPage(page),
      ukvietAgentDetailsPage: new ukvietAgentDetailsPage(page),
      ukvietAgentsContactAddressPage: new ukvietAgentsContactAddressPage(page),
      ukvietAnyoneElseDisqualifiedWhoHasLeftPage: new ukvietAnyoneElseDisqualifiedWhoHasLeftPage(page),
      ukvietCheckAnyoneElseDisqualifiedPage: new ukvietCheckAnyoneElseDisqualifiedPage(page),
      ukvietCheckYourAnswersPage: new ukvietCheckYourAnswersPage(page),
      ukvietConfirmationPage: new ukvietConfirmationPage(page),
      ukvietDeclarationPage: new ukvietDeclarationPage(page),
      ukvietFullNameOfNextPersonToCheckPage: new ukvietFullNameOfNextPersonToCheckPage(page),
      ukvietFullNameOfPersonToCheckPage: new ukvietFullNameOfPersonToCheckPage(page),
      ukvietHomePageWhatDoYouWantToDoPage: new ukvietHomePageWhatDoYouWantToDoPage(page),
      ukvietLandlordDetailsPage: new ukvietLandlordDetailsPage(page),
      ukvietNameOfNextPersonDisqualifiedPage: new ukvietNameOfNextPersonDisqualifiedPage(page),
      ukvietNameOfNextPersonWhoLeftPptyPage: new ukvietNameOfNextPersonWhoLeftPptyPage(page),
      ukvietNameOfPersonDisqualifiedFromRentingPage: new ukvietNameOfPersonDisqualifiedFromRentingPage(page),
      ukvietNameOfPersonWhoLeftPptyPage: new ukvietNameOfPersonWhoLeftPptyPage(page),
      ukvietNoticeDateToDisqualifiedPersonPage: new ukvietNoticeDateToDisqualifiedPersonPage(page),
      ukvietOtherDisqualifiedTenantsPage: new ukvietOtherDisqualifiedTenantsPage(page),
      ukvietProvideMoreInfoOnTenantPage: new ukvietProvideMoreInfoOnTenantPage(page),
      ukvietWhatIsTheAddressOfRentalPptyPage: new ukvietWhatIsTheAddressOfRentalPptyPage(page),
      ukvietWhatIsTheLandlordAddressPage: new ukvietWhatIsTheLandlordAddressPage(page),
      ukvietWhatIsTheLandlordNamePage: new ukvietWhatIsTheLandlordNamePage(page),
      ukvietWhatIsYourAddressPage: new ukvietWhatIsYourAddressPage(page),
      ukvietWhenDidTenancyStartPage: new ukvietWhenDidTenancyStartPage(page),
      ukvietWhenDidThePersonLeavePage: new ukvietWhenDidThePersonLeavePage(page),
      ukvietWhoAreYouPage: new ukvietWhoAreYouPage(page),
    });
  },
});

export const expect = test.expect;
