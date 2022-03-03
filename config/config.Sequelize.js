const CFG_SEQUELIZE_NEW = () => process.env.SEQUELIZE_NEW && process.env.SEQUELIZE_NEW.toLowerCase() === 'true' ? true : false;
const CFG_SEQUELIZE_LOGS = () => process.env.SEQUELIZE_LOGS && process.env.SEQUELIZE_LOGS.toLowerCase() === 'true' ? true : false;

module.exports = {
    CFG_SEQUELIZE_NEW,
    CFG_SEQUELIZE_LOGS
}