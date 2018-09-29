const vscode = require('../vscode');

module.exports = () => {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor) return null;

  const {
    start: selectionStart,
    end: selectionEnd
  } = activeTextEditor.selection;

  return activeTextEditor.document.getText(
    new vscode.Range(selectionStart, selectionEnd)
  );
};
