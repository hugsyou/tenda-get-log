const { Model, DataTypes } = require("sequelize");
const { helperSequelize } = require("../helper/helper.Sequelize.js");

class modelHttpLogs extends Model { }
modelHttpLogs.init(
    {
        requestId: DataTypes.UUIDV4,
        url: DataTypes.STRING,
        baseUrl: DataTypes.STRING,
        originalUrl: DataTypes.STRING,
        params: DataTypes.STRING,
        path: DataTypes.STRING,
        method: DataTypes.STRING,
        hostname: DataTypes.STRING,
        ipAddesss: DataTypes.STRING,
        ipAddressForward: DataTypes.STRING,
        userAgent: DataTypes.STRING,
        errors: DataTypes.STRING
    },
    {
        sequelize: helperSequelize,
        modelName: 'HttpLogs'
    }
);

module.exports = modelHttpLogs;