'use strict';

const steps = require('../../');

Feature('Agent Address');

Before((
  I,
  agentAddressPage
) => {
  I.visitPage(agentAddressPage, steps);
});

Scenario('I am taken to the landlord name page on a valid submission', (
  I,
  agentAddressPage,
  landlordNamePage
) => {
  agentAddressPage.selectAddressAndSubmit();
  I.submitForm();
  I.seeInCurrentUrl(landlordNamePage.url);
});
