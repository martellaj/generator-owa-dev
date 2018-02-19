const fs = require('fs');
const Generator = require('yeoman-generator');
const getCurrentFolderName = require('../../utils/getCurrentFolderName');
const logger = require('../../utils/logger');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        /**
         * Helper function to get the current working folder
         * name.
         */
        this._getCurrentFolderName = function() {
            const currentPath = process.cwd();
            const pathParts = currentPath.split('/');
            const currentFolder = pathParts[pathParts.length - 1];

            return currentFolder;
        }

        /**
         * Helper function to create action type for a given
         * action name.
         */
        this._getActionType = function(actionName) {
            let actionType = '';
            let currentPart = '';

            for (let i = 0; i < actionName.length; i++) {
                const char = actionName[i];
                const upperCaseChar = char.toUpperCase();

                if (char === upperCaseChar) {
                    if (!actionType) {
                        actionType = currentPart;
                    } else {
                        actionType += `_${currentPart}`;
                    }

                    currentPart = upperCaseChar;
                } else {
                    currentPart += upperCaseChar;
                }
            }

            // Grab the last part!
            actionType += `_${currentPart}`;

            return actionType;
        }
    }

    action() {
        /**
         * Ensures user is in a valid folder. Otherwise we bail.
         */
        switch (getCurrentFolderName()) {
            case 'actions':
            case 'mutators':
            case 'orchestrators':
                break;
            default:
                logger.error('You must be in an "actions", "mutators", or "orchestrators" folder to create an action.');
                return;
        }

        this.prompt([
            {
                type    : 'input',
                name    : 'actionName',
                message : `What's your action's name (i.e. setSearchTerm)?`,
                validate: (value) => {
                    if (value.length) {
                        if (fs.existsSync(`${value}.ts`)) {
                            return 'An action with this name already exists in this location.';
                        }

                        return true;
                    } else {
                        return `You can't create a component without a name. C'mon.`
                    }
                }
            },
            {
                type: 'list',
                name: 'actionType',
                message: 'What kind of action do you want to create?',
                choices: ['action', 'mutator', 'mutatorAction', 'orchestrator']
            }
        ]).then(answers => {
            switch (answers.actionType) {
                case 'action':
                    // Copy over action.ts template.
                    this.fs.copyTpl(
                        this.templatePath('action.ts'),
                        this.destinationPath(`${answers.actionName}.ts`),
                        { actionType: this._getActionType(answers.actionName) }
                    );
                    break;
                case 'mutator':
                    // Copy over mutator.ts template.
                    this.fs.copyTpl(
                        this.templatePath('mutator.ts'),
                        this.destinationPath(`${answers.actionName}.ts`)
                    );
                    break;
                case 'mutatorAction':
                    // Copy over mutatorAction.ts template.
                    this.fs.copyTpl(
                        this.templatePath('mutatorAction.ts'),
                        this.destinationPath(`${answers.actionName}.ts`),
                        { actionName: answers.actionName }
                    );
                    break;
                case 'orchestrator':
                    // Copy over orchestrator.ts template.
                    this.fs.copyTpl(
                        this.templatePath('orchestrator.ts'),
                        this.destinationPath(`${answers.actionName}.ts`)
                    );
                    break;
            }

            logger.success(`Successfully created the "${answers.actionName}" action!`);
        });
    }
}