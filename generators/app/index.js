const chalk = require('chalk');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    app() {
        console.log(
`\n${chalk.white.bold('Currently supported generators:')}
  * ${chalk.cyan.bold('Action')}
    - "yo owa-dev:action"
    - This generator lets you choose the name for your
      action, as well as the action type (i.e. "action",
      "mutator", "mutatorAction", "orchestrator").
  * ${chalk.cyan.bold('Component')}
    - "yo owa-dev:component"
    - This generator lets you choose the name for your
      component, and scaffolds out the ".tsx" and
      ".scss" file, as well as ties them together.
  * ${chalk.cyan.bold('Package')}
    - "yo owa-dev:package"
    - This generator lets you choose the name for your
      package, and lets you choose which folders you'd
      like to create underneath it (i.e. "actions",
      "components", "mutators", "orchestrators",
      "services", "store", "test", "utils").
  * ${chalk.cyan.bold('Store')}
    - "yo owa-dev:store"
    - This generator lets you choose the name for you
      store, and scaffolds it out for you (including
      the "store" folder, the "schema" folder with an
      empty interface, and the "store.ts" file itself).\n`
        );
    }
};