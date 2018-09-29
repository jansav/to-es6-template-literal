class RangeStub {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

describe('ideTools', () => {
  let ideTools;
  let vscodeStub;
  let replaceSelectionInEditorWithStub;
  let replaceSelectionInEditorStub;

  beforeEach(() => {
    vscodeStub = {
      window: {},

      Range: RangeStub
    };

    replaceSelectionInEditorStub = () => {};
    replaceSelectionInEditorWithStub = jest.fn(
      () => replaceSelectionInEditorStub
    );

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

  describe('given document is open, when selected text is asked', () => {
    let getTextMock;
    let rangeStub;
    let actual;

    beforeEach(() => {
      getTextMock = jest.fn(() => 'some-selected-text');

      const selectionStart = {
        line: 'some-line-number',
        character: 'some-character'
      };

      const selectionEnd = {
        line: 'other-line-number',
        character: 'other-character'
      };

      rangeStub = new vscodeStub.Range(selectionStart, selectionEnd);

      vscodeStub.window.activeTextEditor = {
        selection: {
          start: selectionStart,
          end: selectionEnd
        },
        document: {
          getText: getTextMock
        }
      };

      actual = ideTools.getSelectedText();
    });

    it('gets selection', () => {
      expect(getTextMock).toHaveBeenCalledWith(rangeStub);
    });

    it('returns selection', () => {
      expect(actual).toBe('some-selected-text');
    });
  });

  describe('given document is not open, when selected text is asked', () => {
    let getTextMock;
    let actual;

    beforeEach(() => {
      getTextMock = jest.fn();

      vscodeStub.window.activeTextEditor = null;
      actual = ideTools.getSelectedText();
    });

    it('does not ask for selected text', () => {
      expect(getTextMock).not.toHaveBeenCalled();
    });

    it('returns null', () => {
      expect(actual).toBe(null);
    });
  });
});
