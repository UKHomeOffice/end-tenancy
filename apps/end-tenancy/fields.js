'use strict';

module.exports = {
  what: {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'request',
      toggle: 'request-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'check',
      toggle: 'check-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'report',
      toggle: 'report-toggle-content',
      child: 'partials/panel'
    }]
  },
  'report-nldp-date': {
    labelClassName: 'visuallyhidden'
  },
  'report-nldp-date-day': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'report-nldp-date-month': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'report-nldp-date-year': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'property-address': {},
  name: {
    mixin: 'input-text',
    labelClassName: 'visuallyhidden',
    validate: 'required'
  },
  'date-left': {
    labelClassName: 'visuallyhidden'
  },
  'date-left-day': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'date-left-month': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'date-left-year': {
    validate: ['required', 'numeric'],
    includeInSummary: false
  },
  'add-another': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required',
    options: [
      'yes',
      'no'
    ],
    includeInSummary: false
  },
  'landlord-address': {}
};
