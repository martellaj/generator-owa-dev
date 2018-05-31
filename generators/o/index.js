const fs = require('fs');
const Generator = require('yeoman-generator');
const getCurrentFolderName = require('../../utils/getCurrentFolderName');
const logger = require('../../utils/logger');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    o() {
        /**
         * Ensures user is in a valid folder. Otherwise we bail.
         */
        switch (getCurrentFolderName()) {
            case 'orchestrators':
                break;
            default:
                logger.error(
                    'You must be in a "orchestrators" folder to create an orchestrator.'
                );
                return;
        }

        this.prompt([
            {
                type: 'input',
                name: 'orchestratorName',
                message: `What's your orchestrator's name (i.e. startSearchOrchestrator)?`,
                validate: value => {
                    if (value.length) {
                        if (fs.existsSync(`${value}.ts`)) {
                            return 'An orchestrator with this name already exists in this location.';
                        }

                        return true;
                    } else {
                        return `You can't create a orchestrator without a name. C'mon.`;
                    }
                }
            }
        ]).then(answers => {
            // Copy over orchestrator.ts template.
            this.fs.copyTpl(
                this.templatePath('orchestrator.ts'),
                this.destinationPath(`${answers.orchestratorName}.ts`)
            );

            logger.success(
                `Successfully created the "${
                    answers.orchestratorName
                }" orchestrator!`
            );
        });
    }
};
