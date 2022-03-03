const { readFileSync } = require("fs");
const helperCheckFileReadAccess = require("./helper.ChekFileReadAccess.js");

const helperReadFileJson = (filePath = "") => {
    if (helperCheckFileReadAccess(filePath)) {
        const jsonResult = JSON.parse(readFileSync(filePath));
        return jsonResult;
    }
};


module.exports = helperReadFileJson;