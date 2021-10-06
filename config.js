'use strict';

/* eslint no-process-env: 0 */
const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;

module.exports = {
  env,
  DATE_FORMAT: 'YYYY-MM-DD',
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  dateTimeFormat: 'DD MMM YYYY HH:MM:SS ZZ',
  postcode: {
    mock: '/api/postcode-test',
    hostname: (!env || env === 'ci') ?
      `http://${localhost()}/api/postcode-test` :
      process.env.POSTCODE_HOST
  },
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || 't@c.com',
    from: process.env.FROM_ADDRESS || 't@c.com',
    replyTo: process.env.REPLY_TO || 't@c.com',
    transport: process.env.EMAIL_TRANSPORT || 'ses',
    transportOptions: {
      accessKeyId: process.env.AWS_USER || 'ses',
      secretAccessKey: process.env.AWS_PASSWORD || 'ses',
      region: process.env.EMAIL_REGION || '',
      port: process.env.EMAIL_PORT || '',
      host: process.env.EMAIL_HOST || '',
      ignoreTLS: process.env.EMAIL_IGNORE_TLS || '',
      secure: process.env.EMAIL_SECURE || ''
    }
  },
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  pdf: {
    mock: '/api/pdf-converter',
    hostname: (!env || env === 'ci') ? `http://${localhost()}/api/pdf-converter` : process.env.PDF_CONVERTER_URL
  },
  upload: {
    mock: '/api/file-upload',
    hostname: (!env || env === 'ci') ? `http://${localhost()}/api/file-upload` : process.env.FILE_VAULT_URL
  },
  keycloak: {
    tokenUrl: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET
  }
};
