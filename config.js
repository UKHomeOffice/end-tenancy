'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  postcode: {
    hostname: process.env.NODE_ENV === 'ci' ?
      `http://${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}/api/postcode-test` :
      'https://postcodeinfo.service.justice.gov.uk',
  },
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || '',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: process.env.EMAIL_TRANSPORT || 'ses',
    region: process.env.EMAIL_REGION || ''
  }
};
