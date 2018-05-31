const fs = require('fs');
const Generator = require('yeoman-generator');
const getCurrentFolderName = require('../../utils/getCurrentFolderName');
const logger = require('../../utils/logger');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    m() {
        /**
         * Ensures user is in a valid folder. Otherwise we bail.
         */
        switch (getCurrentFolderName()) {
            case 'mutators':
                break;
            default:
                logger.error(
                    'You must be in a "mutators" folder to create a mutator.'
                );
                return;
        }

        this.prompt([
            {
                type: 'input',
                name: 'mutatorName',
                message: `What's your mutator's name (i.e. clearSearchBoxMutator)?`,
                validate: value => {
                    if (value.length) {
                        if (fs.existsSync(`${value}.ts`)) {
                            return 'A mutator with this name already exists in this location.';
                        }

                        return true;
                    } else {
                        return `You can't create a mutator without a name. C'mon.`;
                    }
                }
            }
        ]).then(answers => {
            // Copy over mutator.ts template.
            this.fs.copyTpl(
                this.templatePath('mutator.ts'),
                this.destinationPath(`${answers.mutatorName}.ts`)
            );

            logger.success(
                `Successfully created the "${answers.mutatorName}" mutator!`
            );
        });
    }
};
