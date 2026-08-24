/* eslint no-process-env: 0 */


process.env.PORT = 9080;
process.env.NODE_ENV = 'test';
process.env.NOTIFY_KEY = 'UNIT_TEST';
process.env.NOTIFY_STUB = 'true';

const reqres = require('hof').utils.reqres;

const chai = require('chai');
const useChaiPlugin = (pluginModule) => {
  const plugin = pluginModule && (pluginModule.default || pluginModule);
  chai.use(plugin);
};

useChaiPlugin(require('sinon-chai'));
useChaiPlugin(require('chai-as-promised'));
useChaiPlugin(require('chai-subset'));
global.chai = chai;
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
