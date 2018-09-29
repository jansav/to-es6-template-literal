const vscode = require('./vscode');
const replaceSelection = require('./replaceSelection/replaceSelection');
const getSelectedText = require('./getSelectedText/getSelectedText');

const currentDocumentLanguageIsSupported = () =>
  getDocumentLanguage() === 'javascript';

const getDocumentLanguage = () => {
  const activeTextEditor = getActiveTextEditor();

  return activeTextEditor ? activeTextEditor.document.languageId : null;
};

const getActiveTextEditor = () => vscode.window.activeTextEditor || null;

module.exports = {
  currentDocumentLanguageIsSupported,
  getSelectedText,
  replaceSelection
};
