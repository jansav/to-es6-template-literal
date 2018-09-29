const vscode = require('./vscode');
const replaceSelectionInEditorWith = require('./replaceSelectionInEditorWith');

const currentDocumentLanguageIsSupported = () =>
  getDocumentLanguage() === 'javascript';

const getDocumentLanguage = () => {
  const activeTextEditor = getActiveTextEditor();

  return activeTextEditor ? activeTextEditor.document.languageId : null;
};

const getSelectedText = () => {
  const activeTextEditor = getActiveTextEditor();

  if (!activeTextEditor) return null;

  const {
    start: selectionStart,
    end: selectionEnd
  } = activeTextEditor.selection;

  return activeTextEditor.document.getText(
    new vscode.Range(selectionStart, selectionEnd)
  );
};

const getActiveTextEditor = () => vscode.window.activeTextEditor || null;

const replaceSelection = value => {
  const activeTextEditor = getActiveTextEditor();

  const replaceSelectionInEditor = replaceSelectionInEditorWith({
    selection: activeTextEditor.selection,
    value
  });

  activeTextEditor.edit(replaceSelectionInEditor);
};

module.exports = {
  currentDocumentLanguageIsSupported,
  getSelectedText,
  replaceSelection
};
