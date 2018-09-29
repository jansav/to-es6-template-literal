const formatInput = require('./commands/formatInput/formatInput');
const ide = require('./ide/vscode');

module.exports = {
  activate: context => {
    const registerCommand = ide.registerCommandTo(context);

    registerCommand({
      name: 'to-es6-template-literal.format',
      command: formatInput
    });
  },

  deactivate: () => {}
};
