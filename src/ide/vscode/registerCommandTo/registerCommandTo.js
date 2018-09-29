const vscode = require('../vscode');

module.exports = context => ({ name, command }) => {
  const registeredCommand = vscode.commands.registerCommand(name, command);

  context.subscriptions.push(registeredCommand);
};
