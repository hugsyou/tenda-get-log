const { watchFile } = require("fs");
const { join } = require("path");
const helperReadFileJson = require('../helper/helper.ReadFileJson.js');
const helperCheckFileReadAccess = require("../helper/helper.ChekFileReadAccess.js");

const jsonPathTZ = join(__dirname, "../assets/tz.json");
let jsonDataTZ = helperReadFileJson(jsonPathTZ);

const watchFileTZ = () => {
    if (helperCheckFileReadAccess(jsonPathTZ)) {
        watchFile(jsonPathTZ, () => {
            jsonDataTZ = helperReadFileJson(jsonPathTZ);
        });
    }
};
watchFileTZ();

const controllerTZGet = async () => {
    const Result = jsonDataTZ ? jsonDataTZ : helperReadFileJson(jsonPathTZ);
    return Result;
};


module.exports = controllerTZGet;