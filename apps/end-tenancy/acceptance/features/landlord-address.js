'use strict';

const steps = require('../../');

Feature('Landlord Address');

Before((
  I,
  landlordAddressPage
) => {
  I.visitPage(landlordAddressPage, steps);
});

Scenario('I see the use previous checkbox if I am the landlord', function *(
  I,
  landlordAddressPage
) {
  yield I.setSessionData(steps.name, {
    who: 'landlord'
  });
  yield I.refreshPage();
  I.seeElements(landlordAddressPage.postcode.fields.usePrevious);
});

Scenario('I am taken to the confirm page if I tick the use previous address checkbox', function *(
  I,
  landlordAddressPage,
  confirmPage
) {
  yield I.setSessionData(steps.name, {
    who: 'landlord'
  });
  yield I.refreshPage();
  I.checkOption(landlordAddressPage.postcode.fields.usePrevious);
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});

Scenario('I am taken to the confirm page on a valid submission', (
  I,
  landlordAddressPage,
  confirmPage
) => {
  landlordAddressPage.selectAddressAndSubmit();
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});
