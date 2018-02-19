const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    foo() {
        console.log('This is the "foo" command!');
    }
};