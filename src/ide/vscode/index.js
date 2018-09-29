const replaceSelection = require('./replaceSelection/replaceSelection');
const getSelectedText = require('./getSelectedText/getSelectedText');
const currentDocumentLanguageIsSupported = require('./currentDocumentLanguageIsSupported/currentDocumentLanguageIsSupported');
const registerCommandTo = require('./registerCommandTo/registerCommandTo');

module.exports = {
  currentDocumentLanguageIsSupported,
  getSelectedText,
  replaceSelection,
  registerCommandTo
};
