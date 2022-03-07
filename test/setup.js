/* eslint no-process-env: 0 */


process.env.PORT = 9080;
process.env.NODE_ENV = 'test';
process.env.NOTIFY_KEY = 'UNIT_TEST';
process.env.NOTIFY_STUB = 'true';

const reqres = require('hof').utils.reqres;

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .use(require('chai-subset'));
global.should = chai.should();
global.expect = chai.expect;
global.assert = require('assert');
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.path = require('path');
global.config = require('../config');
global._ = require('lodash');
global.request = reqres.req;
global.response = reqres.res;

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
