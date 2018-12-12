const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const join = require('lodash/fp/join');

module.exports = targetString => {
  if (!targetString) return '';

  return convertToTemplateString(targetString);
};

const escapeVariablesWith = escapeVariablePlaceholder => targetString =>
  targetString.replace(/(\s)*\+(\s)*/gim, escapeVariablePlaceholder);

const unescapeVariablesWith = escapeVariablePlaceholder => targetString =>
  targetString.replace(escapeVariablePlaceholder, '+');

const removeLineBreaks = targetString => targetString.replace('\n', '');
const removeTabs = targetString => targetString.replace('\t', '');
const escapeVariablePlaceholder = '@@@';
const escapeVariables = escapeVariablesWith(escapeVariablePlaceholder);
const unescapeVariables = unescapeVariablesWith(escapeVariablePlaceholder);

const splitToParts = targetString =>
  targetString.split(escapeVariablePlaceholder);

const parseString = targetString =>
  targetString.substr(1, targetString.length - 2);

const parseExpression = expression => '${' + expression + '}';

const parsePart = part => {
  const partIsExpression = !part.startsWith("'") && !part.startsWith('"');

  if (partIsExpression) {
    return parseExpression(part);
  }

  return parseString(part);
};

const renderWrapped = targetString => '`' + targetString + '`';

const convertToTemplateString = flow(
  removeLineBreaks,
  removeTabs,
  escapeVariables,
  splitToParts,
  map(parsePart),
  join(''),
  unescapeVariables,
  renderWrapped
);
