const { join } = require("path");

const { Sequelize } = require("sequelize");
const { CFG_SEQUELIZE_LOGS } = require("../config/config.Sequelize.js");

const sequelizeLog = () => CFG_SEQUELIZE_LOGS() ? {} : { logging: false };

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, '../resources/db.sqlite'),
    ...sequelizeLog()
});

const helperSequelize = sequelize;

const helperSequelizeTestConnect = async () => {
    await sequelize.authenticate();
    return true;
};

const helperSequelizeNewDB = async () => {
    const { CFG_SEQUELIZE_NEW } = await import("../config/config.Sequelize.js");
    if (CFG_SEQUELIZE_NEW()) {
        await helperSequelize.sync({ force: true });
        return true;
    }
    else {
        return false;
    }
};


module.exports = {
    helperSequelize,
    helperSequelizeTestConnect,
    helperSequelizeNewDB
}