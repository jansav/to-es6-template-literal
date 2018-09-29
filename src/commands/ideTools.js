const vscode = require('../vscode');

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
    const {
      start: selectionStart,
      end: selectionEnd
    } = activeTextEditor.selection;

    return activeTextEditor.document.getText(
      new vscode.Range(selectionStart, selectionEnd)
    );
  }
};

module.exports = ideTools;
