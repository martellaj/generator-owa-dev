const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    app() {
        console.log(
            `\n${chalk.white.bold('Currently supported generators:')}
* Create an orchestrator with ${chalk.cyan.bold('yo owa-dev:o')}
* Create a mutator with ${chalk.cyan.bold('yo owa-dev:m')}
* Create a component with ${chalk.cyan.bold('yo owa-dev:c')}
* Create a package with ${chalk.cyan.bold('yo owa-dev:p')}\n`
        );
    }
};
