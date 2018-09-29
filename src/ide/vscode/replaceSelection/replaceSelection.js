const vscode = require('../vscode');
const replaceSelectionInEditorWith = require('../replaceSelectionInEditorWith');

module.exports = value => {
  const activeTextEditor = vscode.window.activeTextEditor;

  const replaceSelectionInEditor = replaceSelectionInEditorWith({
    selection: activeTextEditor.selection,
    value
  });

  activeTextEditor.edit(replaceSelectionInEditor);
};
