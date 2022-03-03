const dotenv = require("dotenv");
const helperCheckFileReadAccess = require("./helper.ChekFileReadAccess.js");

const helperDotEnv = (envFilePath = "") => {
    if (helperCheckFileReadAccess(envFilePath)) {
        dotenv.config({
            encoding: 'utf8',
            path: envFilePath
        });
        return true;
    }
    else {
        return false;
    }
};


module.exports = helperDotEnv;