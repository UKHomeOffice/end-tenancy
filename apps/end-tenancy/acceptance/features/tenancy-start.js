'use strict';

const _ = require('lodash');
const steps = require('../../');

Feature('Tenancy Start Page');

Before((
  I,
  tenancyStartPage
) => {
  I.visitPage(tenancyStartPage, steps);
});

Scenario('The correct fields are on the page', (
  I,
  tenancyStartPage
) => {
  I.seeElements(_.values(tenancyStartPage.fields));
});

Scenario('I see an error if I submit without completing the fields', (
  I,
  tenancyStartPage
) => {
  I.submitForm();
  I.seeErrors(tenancyStartPage.fields.date);
});

Scenario('I see an error if I enter an invalid date', (
  I,
  tenancyStartPage
) => {
  tenancyStartPage.enterDate('invalid');
  I.submitForm();
  I.seeErrors(tenancyStartPage.fields.date);
});

Scenario('I see an error if I enter a future date', (
  I,
  tenancyStartPage
) => {
  tenancyStartPage.enterDate('future');
  I.submitForm();
  I.seeErrors(tenancyStartPage.fields.date);
});

Scenario('I am taken to the tenant-details step if I enter a valid date', (
  I,
  tenancyStartPage,
  tenantDetailsPage
) => {
  tenancyStartPage.enterDate('valid');
  I.submitForm();
  I.seeInCurrentUrl(tenantDetailsPage.url);
});
