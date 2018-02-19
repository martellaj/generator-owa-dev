/**
 * Helper function to get the current working folder
 * name.
 */
module.exports = function() {
    const currentPath = process.cwd();
    const pathParts = currentPath.split('/');
    const currentFolder = pathParts[pathParts.length - 1];

    return currentFolder;
}