const vscode = require('../vscode');

module.exports = () => getDocumentLanguage() === 'javascript';

const getDocumentLanguage = () => {
  const activeTextEditor = vscode.window.activeTextEditor;

  return activeTextEditor ? activeTextEditor.document.languageId : null;
};
