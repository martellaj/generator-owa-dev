const fs = require('fs');
const Generator = require('yeoman-generator');
const getCurrentFolderName = require('../../utils/getCurrentFolderName');
const logger = require('../../utils/logger');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        /**
         * Helper function to capitalize store name.
         */
        this._capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        this._getStoreIdentifier = function(storeName) {
            const parts = storeName.split('Store');
            return parts[0].charAt(0).toLowerCase() + parts[0].slice(1);
        }
    }

    store() {
        const currentFolderName = getCurrentFolderName();
        const storeFolderName = 'store';

        /**
         * User must be in a "lib" folder to create a store. If not, just bail.
         * There can't be an existing "store" folder. If there is, just bail.
         */
        if (currentFolderName !== 'lib') {
            logger.error('You must be in a "lib" folder to create a store.');
            return;
        } else if (fs.existsSync(storeFolderName)) {
            logger.error('A "store" folder already exists at this location.');
            return;
        }

        this.prompt([
            {
                type    : 'input',
                name    : 'storeName',
                message : `What's your store's name (i.e. FavoritesStore)?`,
                validate: (value) => {
                    if (value.length) {
                        if (value.indexOf('Store') === -1) {
                            return 'Your store name has to include "Store".'
                        }

                        return true;
                    } else {
                        return `You can't create a store without a name. C'mon.`
                    }
                },
                filter: (value) => {
                    return this._capitalizeFirstLetter(value);
                }
            }
        ]).then(answers => {
            const storeName = answers.storeName;

            // Create and change into "store" folder.
            fs.mkdirSync(storeFolderName);
            process.chdir(storeFolderName);

            // Copy over store.ts template.
            this.fs.copyTpl(
                this.templatePath('store.ts'),
                this.destinationPath('store/store.ts'),
                {
                    storeName: storeName,
                    storeIdentifier: this._getStoreIdentifier(storeName)
                }
            );

            // Create and change into "schema" folder.
            fs.mkdirSync('schema');
            process.chdir('schema');

            // Copy over SchemaStore.ts template.
            this.fs.copyTpl(
                this.templatePath('StoreSchema.ts'),
                this.destinationPath(`store/schema/${storeName}.ts`),
                { storeName: storeName }
            );
        });
    }
}