const ide = require('../../ide/vscode');
const convertStringToTemplateString = require('../../doings/convertStringToTemplateString/convertStringToTemplateString');

module.exports = () => {
  if (!ide.currentDocumentLanguageIsSupported()) return;

  const selectedText = ide.getSelectedText();

  if (!selectedText) return;

  const templateText = convertStringToTemplateString(selectedText);

  ide.replaceSelection('`' + templateText + '`');
};
