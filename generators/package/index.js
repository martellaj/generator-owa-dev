const Generator = require('yeoman-generator');
const fs = require('fs');
const inquirer = require('inquirer');

module.exports = class extends Generator {
    package() {
        this.prompt([
            {
                type    : 'input',
                name    : 'name',
                message : `What's your package's name?`,
                validate: (value) => {
                    if (value.length) {
                        if (fs.existsSync(value)) {
                            return 'A package with this name already exists at this location.';
                        }

                        return true;
                    } else {
                        return `You can't create a package without a name. C'mon.`
                    }
                }
            },
            {
            type    : 'checkbox',
            name    : 'subfolders',
            message : 'Subfolders to create',
            choices: [
                {
                    name: 'actions'
                },
                {
                    name: 'components'
                },
                {
                    name: 'mutators'
                },
                {
                    name: 'orchestrators'
                },
                {
                    name: 'services'
                },
                {
                    name: 'store'
                },
                {
                    name: 'test'
                },
                {
                    name: 'utils'
                },
                new inquirer.Separator('===== End of options =====')
            ]
        }]).then((answers) => {
            const packageName = answers.name;
            const lib = 'lib';

            // Create package directory.
            fs.mkdirSync(packageName);

            // Move into package folder and creat "lib" and then an "index.ts".
            process.chdir(packageName);
            fs.mkdirSync(lib);
            process.chdir(lib);
            fs.writeFileSync('index.ts', '');

            // Create subfolders that user wants.
            answers.subfolders.forEach((subfolder => {
                fs.mkdirSync(subfolder);
            }));

            // Let the user know we created the package.
            this.log(`Successfully created the "${packageName}" package!`);
        });
    }
};