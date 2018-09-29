describe('index', () => {
  let activate;
  let deactivate;
  let registerCommandToMock;
  let registerCommandMock;
  let formatInputStub;
  let contextStub;

  beforeEach(() => {
    formatInputStub = () => {};
    registerCommandMock = jest.fn();
    registerCommandToMock = jest.fn(() => registerCommandMock);
    contextStub = { subscriptions: { push: jest.fn() } };

    jest
      .resetModules()
      .doMock('./commands/formatInput/formatInput', () => formatInputStub)
      .doMock('./ide/vscode', () => ({
        registerCommandTo: registerCommandToMock
      }));

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

    it('creates the register command factory', () => {
      expect(registerCommandToMock).toHaveBeenCalledWith(contextStub);
    });

    it('registers the command by using the factory', () => {
      expect(registerCommandMock).toHaveBeenCalledWith({
        name: 'to-es6-template-literal.format',
        command: formatInputStub
      });
    });
  });
});
