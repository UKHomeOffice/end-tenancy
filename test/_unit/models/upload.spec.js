describe('Upload Model', () => {
  const getConfig = () => ({
    env: 'test',
    upload: {
      hostname: 'https://file-vault.test'
    },
    keycloak: {
      tokenUrl: 'https://keycloak.test/token',
      username: 'service-user',
      password: 'service-password',
      clientId: 'service-client-id',
      clientSecret: 'service-client-secret'
    }
  });

  const getProxyquiredInstance = configMock => {
    const loggerStub = {
      log: sinon.stub(),
      error: sinon.stub()
    };

    const UploadModel = proxyquire('../apps/end-tenancy/models/upload', {
      '../../../config': configMock,
      'hof/lib/logger': sinon.stub().returns(loggerStub)
    });

    return {
      instance: new UploadModel({}),
      loggerStub
    };
  };

  describe('#save', () => {
    let configMock;
    let instance;
    let loggerStub;

    beforeEach(() => {
      configMock = getConfig();
      ({ instance, loggerStub } = getProxyquiredInstance(configMock));

      sinon.stub(instance, 'url').returns('/upload');
      sinon.stub(instance, 'get').callsFake(key => {
        if (key === 'data') {
          return Buffer.from('pdf');
        }
        if (key === 'name') {
          return 'file.pdf';
        }
        if (key === 'mimetype') {
          return 'application/pdf';
        }
        return undefined;
      });
      sinon.stub(instance, 'set').resolves();
      sinon.stub(instance, 'unset').resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should save file data and log a success message', async () => {
      sinon.stub(instance, 'request').resolves({ url: 'file-vault-url' });

      const result = await instance.save();

      expect(result).to.eql({ url: 'file-vault-url' });
      loggerStub.log.should.have.been.calledWithExactly(
        'info',
        'Successfully saved data'
      );
      instance.set.should.have.been.calledWithExactly({
        url: 'file-vault-url'
      });
      instance.unset.should.have.been.calledWithExactly('data');
    });

    it('should log only error message when save fails', async () => {
      const uploadError = new Error('upload failed');
      uploadError.config = {
        headers: {
          authorization: 'Bearer token'
        }
      };
      sinon.stub(instance, 'request').rejects(uploadError);

      await instance.save().should.be.rejected;

      loggerStub.error.should.have.been.calledWithExactly(
        'Error uploading file: upload failed'
      );
    });
  });

  describe('#auth', () => {
    let configMock;
    let instance;
    let loggerStub;

    beforeEach(() => {
      configMock = getConfig();
      ({ instance, loggerStub } = getProxyquiredInstance(configMock));
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return a mock bearer token when token URL is not configured', async () => {
      configMock.keycloak.tokenUrl = '';
      ({ instance, loggerStub } = getProxyquiredInstance(configMock));

      const result = await instance.auth();

      expect(result).to.eql({ bearer: 'abc123' });
      loggerStub.error.should.have.been.calledWithExactly(
        'keycloak token url is not defined'
      );
    });

    it('should return bearer token and log success when auth response is valid', async () => {
      sinon
        .stub(instance, '_request')
        .resolves({ data: { access_token: 'token-123' } });

      const result = await instance.auth();

      expect(result).to.eql({ bearer: 'token-123' });
      loggerStub.log.should.have.been.calledWithExactly(
        'info',
        'Successfully retrieved access token'
      );
    });

    it('should throw and log when auth response has no access token', async () => {
      sinon.stub(instance, '_request').resolves({ data: {} });

      await instance
        .auth()
        .should.be.rejectedWith('No access token in response');

      loggerStub.error.should.have.been.calledWithExactly(
        'No access token in response'
      );
    });

    it('should log keycloak error code without sensitive error description', async () => {
      sinon.stub(instance, '_request').rejects({
        response: {
          data: {
            error: 'invalid_grant',
            error_description: 'sensitive reason should not be logged'
          }
        }
      });

      await instance.auth().should.be.rejected;

      loggerStub.error.should.have.been.calledWithExactly(
        'Error in auth method: invalid_grant'
      );
      loggerStub.error.lastCall.args[0].should.not.include(
        'sensitive reason should not be logged'
      );
    });
  });
});
