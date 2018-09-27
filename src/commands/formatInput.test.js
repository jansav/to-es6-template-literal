describe('formatInput', () => {
  let vscodeStub;
  let formatInput;

  beforeEach(() => {
    vscodeStub = {
      window: {
        activeTextEditor: null
      }
    };

    jest.resetModules().doMock('../vscode', () => vscodeStub);

    formatInput = require('./formatInput');
  });

  describe('given text editor is open', () => {
    beforeEach(() => {
      vscodeStub.window.activeTextEditor = {
        document: {}
      };
    });

    it('given file language is not javascript, when called, returns null', () => {
      vscodeStub.window.activeTextEditor.document.language = 'not javascript';

      const actual = formatInput();

      expect(actual).toBe(null);
    });

    describe('given file language is javascript, when called', () => {
      let actual;

      beforeEach(() => {
        vscodeStub.window.activeTextEditor.document.language = 'javascript';

        actual = formatInput();
      });

      it('creates the selection range', () => {
        expect();
      });

      it('returns active selection', () => {
        expect(actual).toBe('active selection');
      });
    });
  });

  it('given text editor is not open, when called, returns null', () => {
    vscodeStub.window.activeTextEditor = null;

    const actual = formatInput();

    expect(actual).toBe(null);
  });
});
