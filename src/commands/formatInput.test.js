class RangeTestClass {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

describe('formatInput', () => {
  let vscodeStub;
  let formatInput;
  let templatizeStringMock;

  beforeEach(() => {
    templatizeStringMock = jest.fn(() => ({
      output: '`some-templatized-text`'
    }));

    vscodeStub = {
      window: {
        activeTextEditor: null
      },

      Range: RangeTestClass
    };

    jest
      .resetModules()
      .doMock('../vscode', () => vscodeStub)
      .doMock('templatize-string', () => templatizeStringMock);

    formatInput = require('./formatInput');
  });

  describe('given text editor is open', () => {
    let getTextMock;
    let rangeStub;

    beforeEach(() => {
      getTextMock = jest.fn(() => 'some-active-text');

      const selectionStart = {
        line: 'some-line-number',
        character: 'some-character'
      };

      const selectionEnd = {
        line: 'other-line-number',
        character: 'other-character'
      };

      vscodeStub.window.activeTextEditor = {
        selection: {
          start: selectionStart,
          end: selectionEnd
        },
        document: {
          getText: getTextMock
        }
      };

      rangeStub = new vscodeStub.Range(selectionStart, selectionEnd);
    });

    it('given file language is not javascript, when called, returns null', () => {
      vscodeStub.window.activeTextEditor.document.languageId = 'not javascript';

      const actual = formatInput();

      expect(actual).toBe(null);
    });

    describe('given file language is javascript, when called', () => {
      let actual;

      beforeEach(() => {
        vscodeStub.window.activeTextEditor.document.languageId = 'javascript';

        actual = formatInput();
      });

      it('gets text that is selected', () => {
        expect(getTextMock).toHaveBeenCalledWith(rangeStub);
      });

      it('turns selected text to ES6 template string', () => {
        expect(templatizeStringMock).toHaveBeenCalledWith('some-active-text');
      });

      it('returns the templatized string', () => {
        expect(actual).toBe('`some-templatized-text`');
      });
    });
  });

  it('given text editor is not open, when called, returns null', () => {
    vscodeStub.window.activeTextEditor = null;

    const actual = formatInput();

    expect(actual).toBe(null);
  });
});
