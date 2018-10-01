const templatizeString = require('templatize-string');

module.exports = targetString => {
  const templateString = templatizeString(targetString);

  return templateString.renderWrapped();
};
