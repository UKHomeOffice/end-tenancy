'use strict';

const hof = require('hof');
const config = require('./config');

const sessionCookiesTable = require('./apps/end-tenancy/translations/src/en/cookies.json');

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  getCookies: false,
  getTerms: false,
  redis: config.redis
});

if (!config.env || config.env === 'ci') {
  settings.middleware = [require('./mocks')];
}

const app = hof(settings);

app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.appName = 'Ending a Tenancy Service';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/privacy-policy', property: 'Privacy Policy' }
  ];
  return next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  res.locals['session-cookies-table'] = sessionCookiesTable['session-cookies-table'];
  next();
});

module.exports = app;