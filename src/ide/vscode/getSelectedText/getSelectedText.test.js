class RangeStub {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

describe('getSelectedText', () => {
  let vscodeStub;
  let getSelectedText;

  beforeEach(() => {
    vscodeStub = {
      window: {},

      Range: RangeStub
    };

    jest.resetModules().doMock('../vscode', () => vscodeStub);

    getSelectedText = require('./getSelectedText');
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

      actual = getSelectedText();
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

      actual = getSelectedText();
    });

    it('does not ask for selected text', () => {
      expect(getTextMock).not.toHaveBeenCalled();
    });

    it('returns null', () => {
      expect(actual).toBe(null);
    });
  });
});
