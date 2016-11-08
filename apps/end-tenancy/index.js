'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'end-tenancy',
  params: '/:action?/:id?',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/what'
    },
    '/what': {
      fields: [
        'what'
      ],
      next: '/report-nldp-date',
      forks: [{
        target: '/request-property-address',
        condition: {
          field: 'what',
          value: 'request'
        }
      }, {
        target: '/check-nldp-date',
        condition: {
          field: 'what',
          value: 'check'
        }
      }],
      locals: {
        section: 'tenant-property',
        'report-link': 'https://eforms.homeoffice.gov.uk/outreach/lcs-reporting.ofml'
      }
    },
    '/report-nldp-date': {
      controller: controllers.date,
      fields: [
        'report-nldp-date',
        'report-nldp-date-day',
        'report-nldp-date-month',
        'report-nldp-date-year'
      ],
      next: '/report-property-address',
      dateKey: 'report-nldp-date',
      locals: {
        section: 'tenant-property'
      }
    },
    '/report-property-address': {
      controller: require('./controllers/address-lookup'),
      addressKey: 'property-address',
      next: '/tenant-details',
      locals: {
        section: 'tenant-property'
      }
    },
    '/tenant-details': {
      controller: require('./controllers/loop.js'),
      storeKey: 'tenants',
      dateKey: 'date-left',
      fields: [
        'name',
        'date-left',
        'date-left-day',
        'date-left-month',
        'date-left-year',
        'add-another'
      ],
      subSteps: {
        name: {
          fields: [
            'name'
          ]
        },
        date: {
          template: 'date',
          fields: [
            'date-left',
            'date-left-day',
            'date-left-month',
            'date-left-year'
          ]
        },
        'add-another': {
          fields: [
            'add-another'
          ]
        }
      },
      loopCondition: {
        field: 'add-another',
        value: 'yes'
      },
      next: '/report-landlord-agent',
      locals: {
        section: 'tenant-property'
      }
    },
    '/report-landlord-agent': {
      next: '/landlord-address',
      locals: {
        section: 'landlord-details'
      }
    },
    '/landlord-address': {
      controller: require('./controllers/address-lookup'),
      addressKey: 'landlord-address',
      previousAddress: 'property-address',
      next: '/confirm',
      locals: {
        section: 'tenant-property'
      }
    },
    '/confirm': {
      controller: controllers.confirm,
      next: '/confirmation',
      fieldsConfig: require('./fields'),
      emailConfig: require('../../config').email,
      customerEmailField: 'email-address'
    },
    '/request-property-address': {},
    '/check-nldp-date': {},
    '/confirmation': {}
  }
};
