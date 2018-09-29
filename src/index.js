const formatInput = require('./commands/formatInput/formatInput');
const ide = require('./ide/vscode');

module.exports = {
  activate: context => {
    const registerCommand = ide.registerCommandTo(context);

    registerCommand({ name: 'templatize-string.format', command: formatInput });
  },

  deactivate: () => {}
};
