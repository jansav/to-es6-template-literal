const vscode = require('../vscode');

module.exports = () => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) return null;

  const { language: currentDocumentLanguage } = activeTextEditor.document;

  const currentDocumentIsNotJavascript =
    currentDocumentLanguage !== 'javascript';

  if (currentDocumentIsNotJavascript) return null;

  return 'active selection';
};
