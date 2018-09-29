const replaceSelection = require('./replaceSelection/replaceSelection');
const getSelectedText = require('./getSelectedText/getSelectedText');
const currentDocumentLanguageIsSupported = require('./currentDocumentLanguageIsSupported/currentDocumentLanguageIsSupported');

module.exports = {
  currentDocumentLanguageIsSupported,
  getSelectedText,
  replaceSelection
};
