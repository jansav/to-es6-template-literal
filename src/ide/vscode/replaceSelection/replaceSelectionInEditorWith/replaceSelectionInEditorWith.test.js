const replaceSelectionInEditorWith = require('./replaceSelectionInEditorWith');

describe('replaceSelectionInEditorWith', () => {
  describe('when called', () => {
    let replacerFunction;

    beforeEach(() => {
      replacerFunction = replaceSelectionInEditorWith({
        selection: 'some-selection',
        value: 'some-new-value'
      });
    });

    it('creates the replacer function', () => {
      expect(replacerFunction).toEqual(expect.any(Function));
    });

    it('when replacer function is called with edit builder, replaces the selection with new value using edit builder', () => {
      const editBuilderStub = { replace: jest.fn() };

      replacerFunction(editBuilderStub);

      expect(editBuilderStub.replace).toHaveBeenCalledWith(
        'some-selection',
        'some-new-value'
      );
    });
  });
});
