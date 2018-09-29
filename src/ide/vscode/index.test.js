describe('ideTools', () => {
  let ideTools;
  let currentDocumentLanguageIsSupported;
  let getSelectedText;
  let replaceSelection;
  let registerCommandTo;

  beforeEach(() => {
    jest.resetModules().doMock('./vscode', () => () => {});

    ideTools = require('./index');
    currentDocumentLanguageIsSupported = require('./currentDocumentLanguageIsSupported/currentDocumentLanguageIsSupported');
    getSelectedText = require('./getSelectedText/getSelectedText');
    replaceSelection = require('./replaceSelection/replaceSelection');
    registerCommandTo = require('./registerCommandTo/registerCommandTo');
  });

  it('exports the API', () => {
    expect(ideTools).toEqual({
      currentDocumentLanguageIsSupported,
      getSelectedText,
      replaceSelection,
      registerCommandTo
    });
  });
});
