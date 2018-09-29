describe('index', () => {
  let activate;
  let deactivate;
  let registerCommandMock;
  let formatInputStub;
  let registeredCommandStub;
  let contextStub;

  beforeEach(() => {
    formatInputStub = () => {};
    registeredCommandStub = () => {};
    registerCommandMock = jest.fn(() => registeredCommandStub);
    contextStub = { subscriptions: { push: jest.fn() } };

    jest
      .resetModules()
      .doMock('./vscode', () => ({
        commands: { registerCommand: registerCommandMock }
      }))
      .doMock('./commands/formatInput/formatInput', () => formatInputStub);

    const index = require('./index');

    activate = index.activate;
    deactivate = index.deactivate;
  });

  it('exports the deactivate function', () => {
    expect(deactivate).toEqual(expect.any(Function));
  });

  describe('when activated', () => {
    beforeEach(() => {
      activate(contextStub);
    });

    it('creates the command', () => {
      expect(registerCommandMock).toHaveBeenCalledWith(
        'templatize-string.format',
        formatInputStub
      );
    });

    it("subscribes the command to VSCode's context", () => {
      expect(contextStub.subscriptions.push).toHaveBeenCalledWith(
        registeredCommandStub
      );
    });
  });
});
