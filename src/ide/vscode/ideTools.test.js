class RangeStub {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

describe('ideTools', () => {
  let ideTools;
  let vscodeStub;

  beforeEach(() => {
    vscodeStub = {
      window: {},

      Range: RangeStub
    };

    jest.resetModules().doMock('./vscode', () => vscodeStub);

    ideTools = ideTools = require('./ideTools');
  });

  it('given document is open, when current language is javascript, current language is supported', () => {
    vscodeStub.window.activeTextEditor = {
      document: { languageId: 'javascript' }
    };

    const actual = ideTools.currentDocumentLanguageIsSupported();

    expect(actual).toBe(true);
  });

  it('given document is open, when current language is not javascript, current language is not supported', () => {
    vscodeStub.window.activeTextEditor = {
      document: { languageId: 'not javascript' }
    };

    const actual = ideTools.currentDocumentLanguageIsSupported();

    expect(actual).toBe(false);
  });

  it('given document is not open, current language is not supported', () => {
    vscodeStub.window.activeTextEditor = null;

    const actual = ideTools.currentDocumentLanguageIsSupported();

    expect(actual).toBe(false);
  });
});
