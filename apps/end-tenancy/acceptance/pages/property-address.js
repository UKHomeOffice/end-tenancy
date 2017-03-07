/* eslint implicit-dependencies/no-implicit: [2, {dev:true}] */
'use strict';

let I;

const translations = require('../../translations/en/default').pages['property-address'].header;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'property-address',
  postcode: {
    fields: {
      postcode: '#property-address-postcode'
    },
    content: {
      check: translations.default,
      report: translations.what.report,
      valid: 'CR0 2EU'
    }
  },
  lookup: {
    fields: {
      'address-select': '#property-address-select'
    },

    content: {
      'address-select': '49 Sydenham Road, Croydon, CR0 2EU'
    }
  },

  enterValidPostcode() {
    I.fillField(this.postcode.fields.postcode, this.postcode.content.valid);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.enterValidPostcode();
    I.selectOption(this.lookup.fields['address-select'], this.lookup.content['address-select']);
    I.submitForm();
  }
};
