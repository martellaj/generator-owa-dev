const chalk = require('chalk');

module.exports.success = (message) => {
    console.log(chalk.green(message));
};

module.exports.error = (message) => {
    console.log(chalk.red(message));
};