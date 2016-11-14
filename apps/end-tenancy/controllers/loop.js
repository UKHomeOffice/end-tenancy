/* eslint-disable no-underscore-dangle */

'use strict';

const _ = require('lodash');
const Hogan = require('hogan.js');
const DateController = require('hof').controllers.date;

function hoganRender(input, ctx) {
  if (input) {
    return Hogan.compile(input).render(ctx);
  }
  return undefined;
}

function conditionalTranslate(key, t) {
  const result = t(key);
  if (result !== key) {
    return result;
  }
  return undefined;
}

module.exports = class LoopController extends DateController {

  constructor(options) {
    super(options);
    this._template = this.options.template;
    this._fields = _.cloneDeep(this.options.fields);
    this.options.storeKey = this.options.storeKey || 'items';
  }

  get(req, res, callback) {
    if (!req.params.action ||
      Object.keys(this.options.subSteps).indexOf(req.params.action) === -1
    ) {
      const step = Object.keys(this.options.subSteps)[0];
      return res.redirect(`${req.baseUrl.replace(/\/$/, '')}${this.options.route.replace(/\/$/, '')}/${step}`);
    }
    this.options.fields = this.getFields(req);
    this.options.template = this.getTemplate(req);
    return super.get(req, res, callback);
  }

  post(req, res, callback) {
    this.options.fields = this.getFields(req);
    return super.post(req, res, callback);
  }

  getTemplate(req) {
    const step = this.options.subSteps[req.params.action];
    if (step.template) {
      return step.template;
    }
    return this._template;
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (req.params.id !== undefined) {
        const items = req.sessionModel.get(this.options.storeKey) || {};
        values = Object.assign({}, values, items[req.params.id]);
      }
      return callback(err, values);
    });
  }

  getNextStep(req, res, callback) {
    const steps = Object.keys(this.options.subSteps);
    const stepName = req.params.action;
    const step = this.options.subSteps[stepName];
    const loopCondition = this.options.loopCondition;
    let index = steps.indexOf(stepName);
    step.forks = step.forks || [];

    const next = super._getForkTarget.call(Object.assign({}, this, {
      options: step
    }), req, res);

    if (index < steps.length - 1) {
      return req.url.replace(stepName, next);
    } else if (loopCondition && req.form.values[loopCondition.field] === loopCondition.value) {
      return req.url.replace(stepName, steps[0]);
    }
    return super.getNextStep(req, res, callback);
  }

  getBackLink(req, res, callback) {
    const steps = Object.keys(this.options.subSteps);
    const step = req.params.action;
    let index = steps.indexOf(step);
    if (index > 0) {
      return req.url.replace(step, steps[index - 1]);
    }
    return super.getBackLink(req, res, callback);
  }

  getFields(req) {
    const step = this.options.subSteps[req.params.action];
    return _.pick(this._fields, step.fields);
  }

  saveValues(req, res, callback) {
    const steps = Object.keys(this.options.subSteps);
    if (steps.indexOf(req.params.action) === steps.length - 1) {
      const items = req.sessionModel.get(this.options.storeKey) || {};
      let id = req.params.id;
      if (id === undefined) {
        id = parseInt(req.sessionModel.get(`${this.options.storeKey}-id`) || 0, 10);
        req.sessionModel.set(`${this.options.storeKey}-id`, id + 1);
      }
      items[id] = {};
      Object.keys(_.pickBy(this._fields, field => {
        return field.includeInSummary !== false;
      })).forEach(field => {
        items[id][field] = req.sessionModel.get(field);
      });
      req.sessionModel.set(this.options.storeKey, items);
      req.sessionModel.unset(Object.keys(this._fields));
      return callback();
    }
    return super.saveValues(req, res, callback);
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const pagePath = `${locals.route}-${req.params.action}`;
    const title = hoganRender(conditionalTranslate(`pages.${pagePath}.header`, req.translate), res.locals);
    const intro = hoganRender(conditionalTranslate(`pages.${pagePath}.intro`, req.translate), res.locals);
    return Object.assign({}, locals, {
      title,
      intro
    });
  }
};
