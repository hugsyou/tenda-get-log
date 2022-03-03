const fetch = require("node-fetch");
const { CFG_ROUTER_URL } = require("../config/config.System.js");
const helperGetLogFromRouter = require("./helper.GetLogFromRouter.js");
const heplerRefactorDataLog = require("./helper.RefatorDataLog.js");

const helperRenderDataLog = async (inputROUTER_URL = CFG_ROUTER_URL()) => {
    /**
     * @type {{lineNumber: number, lineNumberString: string, dateString: string, timeString: string, dateTime: Date, details: string}[]}
     */
    const logData = [];
    const getTimeZone = await helperGetLogFromRouter(inputROUTER_URL);
    const data = await fetch(`${inputROUTER_URL}/cgi-bin/DownloadSyslog/RouterSystem.log`, {
        method: "GET"
    }).then(function (response) {
        return response.text();
    });
    const splitData = data.split(/\r\n/);
    if (splitData.length > 0) {
        if (splitData[0] === "#This file shows the router's system log.") {
            for (let index = 1; index < splitData.length; index++) {
                const element = heplerRefactorDataLog(splitData[index], getTimeZone.tzz);
                if (!element) {
                    if (splitData[index]) {
                        if (logData.length === 0) {
                            const currentDate = new Date();
                            logData.push({
                                lineNumber: 0,
                                lineNumberString: '0',
                                dateString: `${currentDate.getFullYear()}:${currentDate.getMonth()}:${currentDate.getDay()}`,
                                timeString: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
                                dateTime: currentDate,
                                details: `unknowData: ${splitData[index]}`
                            });
                        }
                        else {
                            logData.push({
                                lineNumber: 0,
                                lineNumberString: '0',
                                dateString: logData[logData.length - 1].dateString,
                                timeString: logData[logData.length - 1].timeString,
                                dateTime: logData[logData.length - 1].dateTime,
                                details: `unknowData: ${splitData[index]}`
                            });
                        }
                    }
                }
                else {
                    logData.push(element);
                }
            }
        }
    }

    return logData;
}


module.exports = helperRenderDataLog;