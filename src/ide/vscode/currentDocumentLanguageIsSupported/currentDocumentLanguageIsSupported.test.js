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

  ['javascript', 'javascriptreact', 'typescript', 'typescriptreact'].forEach(
    language => {
      it(`given document is open, when current language is "${language}", current language is supported`, () => {
        vscodeStub.window.activeTextEditor = {
          document: { languageId: language }
        };

        const actual = currentDocumentLanguageIsSupported();

        expect(actual).toBe(true);
      });
    }
  );

  it('given document is open, when current language is something else, current language is not supported', () => {
    vscodeStub.window.activeTextEditor = {
      document: { languageId: 'something else' }
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
