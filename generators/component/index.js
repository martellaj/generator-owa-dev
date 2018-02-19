const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('componentName', { type: String, required: true });

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
    }

    component() {
        const componentsDir = 'components';
        const componentName = this.options.componentName;

        let isInLib = false;

        /**
         * If user is currently in a "lib" folder, we're good. Then,
         * check to see if "components" folder exists. If it doesn't, create
         * it. Then change into it.
         */
        if (this._getCurrentFolderName().toLowerCase() === 'lib') {
            isInLib = true;

            // If "components" directory doesn't exist, create it.
            if (!fs.existsSync(componentsDir)) {
                fs.mkdirSync(componentsDir);
            }

            // Go into "components" directory.
            process.chdir(componentsDir);
        }

        /**
         * If user is a "components" folder and a component with the same name
         * doesn't exist, we're good. If those conditions haven't been met, bail.
         */
        if (this._getCurrentFolderName().toLowerCase() === componentsDir) {
            if (!fs.existsSync(`${componentName}.tsx`)) {
                const componentDestinationPath = isInLib ? `components/${componentName}.tsx` : `${componentName}.tsx`;
                const stylesDestinationPath = isInLib ? `components/${componentName}.scss` : `${componentName}.scss`;

                // Copy over .tsx template.
                this.fs.copyTpl(
                    this.templatePath('Component.tsx'),
                    this.destinationPath(componentDestinationPath),
                    { componentName: componentName }
                );

                // Copy over .scss template.
                this.fs.copyTpl(
                    this.templatePath('Component.scss'),
                    this.destinationPath(stylesDestinationPath),
                    { componentName: componentName }
                );
            } else {
                this.log('Unable to create component (one with the same name already exists at this location).');
            }
        } else {
            this.log('Unable to create component (must be in "lib" or "components" directory).');
        }
    }
};