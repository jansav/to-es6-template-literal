const vscode = require('../vscode');
const templatizeString = require('templatize-string');

module.exports = () => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) return null;

  const { languageId: currentDocumentLanguage } = activeTextEditor.document;

  const currentDocumentIsJavascript = currentDocumentLanguage === 'javascript';

  if (!currentDocumentIsJavascript) return null;

  const {
    start: selectionStart,
    end: selectionEnd
  } = activeTextEditor.selection;

  const selectedText = activeTextEditor.document.getText(
    new vscode.Range(selectionStart, selectionEnd)
  );

  const templatizedString = templatizeString(selectedText);

  return templatizedString.output;
};
