describe('registerCommandTo', () => {
  let registerCommand;
  let registerCommandMock;
  let registeredCommandStub;
  let contextStub;

  beforeEach(() => {
    registerCommandMock = jest.fn(() => registeredCommandStub);
    contextStub = { subscriptions: { push: jest.fn() } };

    jest.resetModules().doMock('../vscode', () => ({
      commands: { registerCommand: registerCommandMock }
    }));

    const registerCommandTo = require('./registerCommandTo');

    registerCommand = registerCommandTo(contextStub);
  });

  describe('when asked to register command', () => {
    let commandStub;

    beforeEach(() => {
      commandStub = () => {};

      registerCommand({ name: 'some-command-name', command: commandStub });
    });

    it('creates the command', () => {
      expect(registerCommandMock).toHaveBeenCalledWith(
        'some-command-name',
        commandStub
      );
    });

    it("subscribes the command to VSCode's context", () => {
      expect(contextStub.subscriptions.push).toHaveBeenCalledWith(
        registeredCommandStub
      );
    });
  });
});
