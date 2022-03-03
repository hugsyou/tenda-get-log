const { accessSync, constants } = require("fs");

/**
 * @template T
 * @param {string} filePath 
 * @param {(error: Error) => {}|T} callback 
 * @returns {boolean}
 */
const helperCheckFileReadAccess = (filePath, callback = (error) => {}) => {
    try {
        accessSync(filePath, constants.R_OK);
        return true;
    } catch (error) {
        callback(error);
        return false;
    }
};

module.exports = helperCheckFileReadAccess;