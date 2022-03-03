const { Model, DataTypes } = require("sequelize");
const { helperSequelize } = require("../helper/helper.Sequelize.js");

class modelTendaLogs extends Model { }
modelTendaLogs.init(
    {
        // {lineNumber: number, lineNumberString: string, dateString: string, timeString: string, dateTime: Date, details: string}
        routerURL: DataTypes.STRING,
        lineNumber: DataTypes.INTEGER,
        lineNumberString: DataTypes.STRING,
        dateString: DataTypes.STRING(10),
        timeString: DataTypes.STRING(8),
        dateTime: DataTypes.DATE,
        details: DataTypes.TEXT
    },
    {
        sequelize: helperSequelize,
        modelName: 'TendaLogs'
    }
);

module.exports = modelTendaLogs;