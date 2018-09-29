const vscode = require('../vscode');

module.exports = () => {
  const documentLanguage = getDocumentLanguage();

  return [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact'
  ].includes(documentLanguage);
};

const getDocumentLanguage = () => {
  const activeTextEditor = vscode.window.activeTextEditor;

  return activeTextEditor ? activeTextEditor.document.languageId : null;
};
