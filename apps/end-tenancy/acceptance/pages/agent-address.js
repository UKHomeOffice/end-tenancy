/* eslint implicit-dependencies/no-implicit: [2, {dev:true}] */
'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'agent-address',

  postcode: {
    fields: {
      postcode: '#agent-address-postcode'
    },
    content: {
      valid: 'CR0 2EU'
    }
  },
  lookup: {
    fields: {
      'address-select': '#agent-address-select'
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
