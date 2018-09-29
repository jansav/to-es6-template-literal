describe('currentDocumentLanguageIsSupported', () => {
  let vscodeStub;
  let currentDocumentLanguageIsSupported;

  beforeEach(() => {
    vscodeStub = {
      window: {}
    };

    jest.resetModules().doMock('../vscode', () => vscodeStub);

    currentDocumentLanguageIsSupported = require('./currentDocumentLanguageIsSupported');
  });

  it('given document is open, when current language is javascript, current language is supported', () => {
    vscodeStub.window.activeTextEditor = {
      document: { languageId: 'javascript' }
    };

    const actual = currentDocumentLanguageIsSupported();

    expect(actual).toBe(true);
  });

  it('given document is open, when current language is not javascript, current language is not supported', () => {
    vscodeStub.window.activeTextEditor = {
      document: { languageId: 'not javascript' }
    };

    const actual = currentDocumentLanguageIsSupported();

    expect(actual).toBe(false);
  });

  it('given document is not open, current language is not supported', () => {
    vscodeStub.window.activeTextEditor = null;

    const actual = currentDocumentLanguageIsSupported();

    expect(actual).toBe(false);
  });
});
