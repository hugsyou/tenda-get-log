const { join } = require("path");

const helperDotEnv = require("./helper/helper.DotEnv.js");

const loadEnv = async () => helperDotEnv(join(__dirname, ".env"));
if (!loadEnv()) {
    throw Error("Envrionment not loaded");
}
else {
    console.log(new Date(), 'Load Env: true');
    require("./pre.js")();
}