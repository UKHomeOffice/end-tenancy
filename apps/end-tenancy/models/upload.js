/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const FormData = require('form-data');
const { model: Model } = require('hof');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  async save() {
    try {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      reqConf.data = formData;
      reqConf.method = 'POST';
      reqConf.headers = {
        ...formData.getHeaders()
      };
      const response = await this.request(reqConf);
      await this.set({ url: response.url });
      logger.log('info', 'Successfully saved data');
      await this.unset('data');

      return response;
    } catch (err) {
      logger.error(`Error uploading file: ${err.message}`);
      throw err;
    }
  }

  async auth() {
    try {
      if (!config.keycloak.tokenUrl) {
        logger.error('keycloak token url is not defined');
        return {
          bearer: 'abc123'
        };
      }
      const tokenReq = {
        url: config.keycloak.tokenUrl,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          username: config.keycloak.username,
          password: config.keycloak.password,
          grant_type: 'password',
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.clientSecret
        },
        method: 'POST'
      };
      const response = await this._request(tokenReq);
      if (!response.data || !response.data.access_token) {
        const errorMsg = 'No access token in response';
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
      logger.log('info', 'Successfully retrieved access token');
      return { bearer: response.data.access_token };
    } catch (err) {
      logger.error(`Error in auth method: ${err.response?.data?.error || err.message}`);
      throw err;
    }
  }
};
