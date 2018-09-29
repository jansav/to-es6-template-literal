describe('replaceSelection', () => {
  let vscodeStub;
  let replaceSelectionInEditorStub;
  let replaceSelectionInEditorWithStub;
  let replaceSelection;

  beforeEach(() => {
    vscodeStub = {
      window: {}
    };

    replaceSelectionInEditorStub = () => {};
    replaceSelectionInEditorWithStub = jest.fn(
      () => replaceSelectionInEditorStub
    );

    jest
      .resetModules()
      .doMock('../vscode', () => vscodeStub)
      .doMock(
        '../replaceSelectionInEditorWith',
        () => replaceSelectionInEditorWithStub
      );

    replaceSelection = require('./replaceSelection');
  });

  describe('given document is open and has selection, when asked to replace selection', () => {
    let editMock;
    let selectionStub;

    beforeEach(() => {
      editMock = jest.fn();

      selectionStub = {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 0 }
      };

      vscodeStub.window.activeTextEditor = {
        document: {},
        selection: selectionStub,
        edit: editMock
      };

      replaceSelection('some-value');
    });

    it('creates the replaces function with selection and value', () => {
      expect(replaceSelectionInEditorWithStub).toHaveBeenCalledWith({
        selection: selectionStub,
        value: 'some-value'
      });
    });

    it('edits the document with the replacer function', () => {
      expect(editMock).toHaveBeenCalledWith(replaceSelectionInEditorStub);
    });
  });
});
