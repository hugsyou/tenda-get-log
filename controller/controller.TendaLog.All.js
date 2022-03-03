const modelTendaLogs = require("../model/model.TendaLogs.js");

const controllerTendaLogAll = async () => {
    return await modelTendaLogs.findAll(
        {
            order: [['dateTime', 'DESC']]
        }
    ).then(r => r.map((w, i) => ({ ...w.dataValues, rowNumber: i + 1 })));
};


module.exports = controllerTendaLogAll;