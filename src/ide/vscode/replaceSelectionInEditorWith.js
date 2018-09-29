module.exports = ({ selection, value }) => editBuilder =>
  editBuilder.replace(selection, value);
