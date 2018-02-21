/**
 * Helper function to get the current working folder
 * name.
 */
module.exports = function() {
    const splitToken = process.platform === 'win32' ? '\\' : '/';

    const currentPath = process.cwd();
    const pathParts = currentPath.split(splitToken);
    const currentFolder = pathParts[pathParts.length - 1];

    return currentFolder;
}