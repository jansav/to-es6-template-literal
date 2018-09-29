const vscode = require('./vscode');
const replaceSelectionInEditorWith = require('./replaceSelectionInEditorWith');

const ideTools = {
  _getActiveTextEditor: function() {
    return vscode.window.activeTextEditor || null;
  },

  _getDocumentLanguage: function() {
    const activeTextEditor = this._getActiveTextEditor();

    return activeTextEditor ? activeTextEditor.document.languageId : null;
  },

  currentDocumentLanguageIsSupported: function() {
    return this._getDocumentLanguage() === 'javascript';
  },

  getSelectedText: function() {
    const activeTextEditor = this._getActiveTextEditor();

    if (!activeTextEditor) return null;

    const {
      start: selectionStart,
      end: selectionEnd
    } = activeTextEditor.selection;

    return activeTextEditor.document.getText(
      new vscode.Range(selectionStart, selectionEnd)
    );
  },

  replaceSelection: function(value) {
    const activeTextEditor = this._getActiveTextEditor();

    const replaceSelectionInEditor = replaceSelectionInEditorWith({
      selection: activeTextEditor.selection,
      value
    });

    activeTextEditor.edit(replaceSelectionInEditor);
  }
};

module.exports = ideTools;
