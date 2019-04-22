/* eslint-disable no-console */
const notifier = require('node-notifier');
const colors = require('ansi-colors');

module.exports = (message, error) => {
  console.log(
    colors.inverse(colors.redBright(`${error.plugin} error:`)),
    error.messageFormatted || error.message
  );

  notifier.notify({
    title: 'Gulp',
    sound: 'Frog',
    message
  });
};
