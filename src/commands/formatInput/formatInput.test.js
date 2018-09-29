describe('formatInput', () => {
  let formatInput;
  let convertStringToTemplateStringMock;
  let ideStub;

  beforeEach(() => {
    convertStringToTemplateStringMock = jest.fn(() => 'some-template-text');

    ideStub = {
      currentDocumentLanguageIsSupported: jest.fn(),
      getSelectedText: jest.fn(() => 'some-selected-text'),
      replaceSelection: jest.fn()
    };

    jest
      .resetModules()
      .doMock('../../ide/vscode', () => ideStub)
      .doMock(
        '../../doings/convertStringToTemplateString/convertStringToTemplateString',
        () => convertStringToTemplateStringMock
      );

    formatInput = require('./formatInput');
  });

  describe('given current document language is supported, when formatting', () => {
    beforeEach(() => {
      ideStub.currentDocumentLanguageIsSupported.mockReturnValue(true);

      formatInput();
    });

    it('asks current document language', () => {
      expect(ideStub.currentDocumentLanguageIsSupported).toHaveBeenCalled();
    });

    it('asks the selected text', () => {
      expect(ideStub.getSelectedText).toHaveBeenCalled();
    });

    it('templatizes the selected text', () => {
      expect(convertStringToTemplateStringMock).toHaveBeenCalledWith(
        'some-selected-text'
      );
    });

    it('replaces the selection with template text', () => {
      expect(ideStub.replaceSelection).toHaveBeenCalledWith(
        '`some-template-text`'
      );
    });
  });

  describe('given current document language is not supported, when formatting', () => {
    let actual;

    beforeEach(() => {
      ideStub.currentDocumentLanguageIsSupported.mockReturnValue(false);

      actual = formatInput();
    });

    it('does not ask for selected text', () => {
      expect(ideStub.getSelectedText).not.toHaveBeenCalled();
    });

    it('returns undefined', () => {
      expect(actual).toBe(undefined);
    });
  });
});
