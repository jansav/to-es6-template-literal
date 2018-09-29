describe('formatInput', () => {
  let formatInput;
  let convertStringToTemplateStringMock;
  let ideToolsStub;

  beforeEach(() => {
    convertStringToTemplateStringMock = jest.fn(() => 'some-template-text');

    ideToolsStub = {
      currentDocumentLanguageIsSupported: jest.fn(),
      getSelectedText: jest.fn(() => 'some-selected-text')
    };

    jest
      .resetModules()
      .doMock('../../ideTools', () => ideToolsStub)
      .doMock(
        '../../doings/convertStringToTemplateString/convertStringToTemplateString',
        () => convertStringToTemplateStringMock
      );

    formatInput = require('./formatInput');
  });

  describe('given current document language is supported, when formatting', () => {
    let actual;

    beforeEach(() => {
      ideToolsStub.currentDocumentLanguageIsSupported.mockReturnValue(true);

      actual = formatInput();
    });

    it('asks current document language', () => {
      expect(
        ideToolsStub.currentDocumentLanguageIsSupported
      ).toHaveBeenCalled();
    });

    it('asks the selected text', () => {
      expect(ideToolsStub.getSelectedText).toHaveBeenCalled();
    });

    it('templatizes the selected text', () => {
      expect(convertStringToTemplateStringMock).toHaveBeenCalledWith(
        'some-selected-text'
      );
    });

    it('returns the template text', () => {
      expect(actual).toBe('some-template-text');
    });
  });

  describe('given current document language is not supported, when formatting', () => {
    let actual;

    beforeEach(() => {
      ideToolsStub.currentDocumentLanguageIsSupported.mockReturnValue(false);

      actual = formatInput();
    });

    it('does not ask for selected text', () => {
      expect(ideToolsStub.getSelectedText).not.toHaveBeenCalled();
    });

    it('returns undefined', () => {
      expect(actual).toBe(undefined);
    });
  });
});
