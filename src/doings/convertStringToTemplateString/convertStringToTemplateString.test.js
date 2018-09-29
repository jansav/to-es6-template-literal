describe('convertStringToTemplateString', () => {
  let templatizeStringMock;
  let convertStringToTemplateString;

  beforeEach(() => {
    templatizeStringMock = jest.fn(() => ({ output: 'some-template-string' }));

    jest.resetModules().doMock('templatize-string', () => templatizeStringMock);

    convertStringToTemplateString = require('./convertStringToTemplateString');
  });

  describe('when called', () => {
    let actual;

    beforeEach(() => {
      actual = convertStringToTemplateString('some-string');
    });

    it('asks for template string', () => {
      expect(templatizeStringMock).toHaveBeenCalledWith('some-string');
    });

    it('returns the string that has been turned to template string', () => {
      expect(actual).toBe('some-template-string');
    });
  });
});
