/* eslint implicit-dependencies/no-implicit: [2, {dev:true}] */
'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'landlord-address',

  postcode: {
    fields: {
      postcode: '#landlord-address-postcode',
      usePrevious: '#use-previous-address'
    },
    content: {
      valid: 'CR0 2EU'
    }
  },
  lookup: {
    fields: {
      'address-select': '#landlord-address-select'
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
