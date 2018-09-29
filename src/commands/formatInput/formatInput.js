const ideTools = require('../../ideTools');
const convertStringToTemplateString = require('../../doings/convertStringToTemplateString/convertStringToTemplateString');

module.exports = () => {
  if (!ideTools.currentDocumentLanguageIsSupported()) return;

  const selectedText = ideTools.getSelectedText();

  return convertStringToTemplateString(selectedText);
};
