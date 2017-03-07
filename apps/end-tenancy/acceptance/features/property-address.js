'use strict';

const steps = require('../../');

Feature('Property Address Step(s)');

Before((
  I,
  propertyAddressPage
) => {
  I.visitPage(propertyAddressPage, steps);
});

Scenario('I see the correct header if I previously selected "report"', function *(
  I,
  propertyAddressPage
) {
  yield I.setSessionData(steps.name, {
    what: 'report'
  });
  yield I.refreshPage();
  I.see(propertyAddressPage.postcode.content.report);
});

Scenario('I see the correct header if I previously selected "check"', function *(
  I,
  propertyAddressPage
) {
  yield I.setSessionData(steps.name, {
    what: 'check'
  });
  yield I.refreshPage();
  I.see(propertyAddressPage.postcode.content.check);
});

Scenario('I am taken to the tenant-details page on a valid submission', (
  I,
  propertyAddressPage,
  tenantDetailsPage
) => {
  propertyAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(tenantDetailsPage.url);
});

Scenario('I am taken to the tenancy-start page if I am requesting an nldp', function *(
  I,
  propertyAddressPage,
  tenancyStartPage
) {
  yield I.setSessionData(steps.name, {
    what: 'request'
  });
  yield I.refreshPage();
  propertyAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(tenancyStartPage.url);
});
