const { CFG_ROUTER_URL } = require("../config/config.System.js");
const { helperRenderDataLog } = require("../helper/helper.RenderDataLog.js");
const { helperGoogleSheetDatabase } = require("../helper/helper.GoogleSheetDatabase.js");


const controllerSheetLogGet = async () => {
    const getTendaLog = await helperRenderDataLog(CFG_ROUTER_URL());
    const getGSDB = await helperGoogleSheetDatabase();

    const fnFindLatestLog = async () => {
        for (let index = 0; index < getTendaLog.length; index++) {
            const element = getTendaLog[index];
            const findLogExists = await getGSDB.findOne(
                {
                    routerURL: CFG_ROUTER_URL(),
                    dateTime: element.dateTime,
                    details: element.details
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
        await getGSDB.insert(getTendaLog.slice(findLatestLog).map(where => {
            return {
                ...where,
                id: '=ROW()-1',
                routerURL: CFG_ROUTER_URL(),
            }
        }));
    }

    return getTendaLog;
};


module.exports = controllerSheetLogGet;