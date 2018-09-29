const ideTools = require('../../ideTools');
const templatizeString = require('templatize-string');

module.exports = () => {
  if (!ideTools.currentDocumentLanguageIsSupported()) return;

  const selectedText = ideTools.getSelectedText();
  const templatizedString = templatizeString(selectedText);

  return templatizedString.output;
};
