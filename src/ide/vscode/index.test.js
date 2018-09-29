describe('ideTools', () => {
  let ideTools;
  let currentDocumentLanguageIsSupported;
  let getSelectedText;
  let replaceSelection;

  beforeEach(() => {
    jest.resetModules().doMock('./vscode', () => () => {});

    ideTools = require('./index');
    currentDocumentLanguageIsSupported = require('./currentDocumentLanguageIsSupported/currentDocumentLanguageIsSupported');
    getSelectedText = require('./getSelectedText/getSelectedText');
    replaceSelection = require('./replaceSelection/replaceSelection');
  });

  it('exports the API', () => {
    expect(ideTools).toEqual({
      currentDocumentLanguageIsSupported,
      getSelectedText,
      replaceSelection
    });
  });
});
