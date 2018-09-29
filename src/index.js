const vscode = require('./ide/vscode/vscode');
const formatInput = require('./commands/formatInput/formatInput');

module.exports = {
  activate: context => {
    const registeredCommand = vscode.commands.registerCommand(
      'templatize-string.format',
      formatInput
    );

    context.subscriptions.push(registeredCommand);
  },

  deactivate: () => {}
};
