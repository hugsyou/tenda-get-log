const fetch = require("node-fetch");
const CFG_TIMEZONE_DB = require("../config/config.TimeZone.js");
const { CFG_ROUTER_URL } = require("../config/config.System.js");

const helperGetLogFromRouter = async (inputROUTER_URL = CFG_ROUTER_URL()) => {
    const requestHost = inputROUTER_URL;
    const requestURL = `${requestHost}/goform/getSysTools?${Date.now() + Math.random()}&modules=sysTime`

    /**
     * @typedef {object} responseTimeZone
     * @property {object} sysTime
     * @property {string} sysTime.sysTimeZone
     * @property {string} sysTime.sysTimecurrentTime
     * @property {string} sysTime.sysTimeSntpType
     * @property {string} sysTime.internetState
     */
    const responseJson = await fetch(requestURL, {
        method: "GET"
    })
        .then(async function (response) {
            /**
             * @type {responseTimeZone}
             */
            const dataJson = await response.json();
            if (dataJson.sysTime) {
                const getResponseTimeZone = Number.isSafeInteger(Number(dataJson.sysTime.sysTimeZone)) ? Number(dataJson.sysTime.sysTimeZone) : 56;
                const findData = CFG_TIMEZONE_DB.findIndex(where => where.value === getResponseTimeZone);
                return findData !== -1 ? CFG_TIMEZONE_DB[findData] : CFG_TIMEZONE_DB[56];
            }
            else {
                return CFG_TIMEZONE_DB[56];
            }
        });

    return responseJson;
};


module.exports = helperGetLogFromRouter;