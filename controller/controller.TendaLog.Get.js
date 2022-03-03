const { CFG_ROUTER_URL } = require("../config/config.System.js");
const helperRenderDataLog = require("../helper/helper.RenderDataLog.js");
const { helperSequelize } = require("../helper/helper.Sequelize.js");
const modelTendaLogs = require("../model/model.TendaLogs.js");


const controllerTendaLogGet = async () => {
    const getTendaLog = await helperRenderDataLog(CFG_ROUTER_URL());

    await helperSequelize.transaction(async (txn) => {
        const fnFindLatestLog = async () => {
            for (let index = 0; index < getTendaLog.length; index++) {
                const element = getTendaLog[index];
                const findLogExists = await modelTendaLogs.findOne(
                    {
                        where: {
                            routerURL: CFG_ROUTER_URL(),
                            dateString: element.dateString,
                            timeString: element.timeString,
                            dateTime: element.dateTime,
                            details: element.details
                        },
                        transaction: txn
                    }
                );

                if (findLogExists) { continue; }
                else {
                    return index;
                }
            };

            return -1;
        };

        const findLatestLog = await fnFindLatestLog();
        if (findLatestLog > -1) {
            for (let index = findLatestLog; index < getTendaLog.length; index++) {
                const element = getTendaLog[index];
                await modelTendaLogs.create({
                    routerURL: CFG_ROUTER_URL(),
                    ...element
                }, { transaction: txn });
            }
        }
    });

    return getTendaLog;
};


module.exports = controllerTendaLogGet;