const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('packageName', { type: String, required: true });
    }

    package() {
        const packageName = this.options.packageName;

        if (!fs.existsSync(packageName)) {
            const lib = 'lib';

            // Create package directory.
            fs.mkdirSync(packageName);

            // Move into package folder and creat "lib" and then an "index.ts".
            process.chdir(packageName);
            fs.mkdirSync(lib);
            process.chdir(lib);
            fs.writeFileSync('index.ts', '');

            // Let the user know we created the package.
            this.log(`Successfully created the "${packageName}" package!`);
        } else {
            this.log('Unable to create package (one with the same name already exists at this location).');
        }
    }
};