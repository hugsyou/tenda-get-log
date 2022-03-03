const app = require('./app.js')
const {
    helperSequelizeNewDB,
    helperSequelizeTestConnect
} = require('./helper/helper.Sequelize.js');

module.exports = async () => {
    const loadDB = async () => helperSequelizeTestConnect();
    const loadApp = async () => app();
    loadDB().then(
        function (loadDBResult) {
            console.info(new Date(), `Load DB: ${loadDBResult}`);
            helperSequelizeNewDB();
            loadApp().then(
                function (loadAppResult) {
                    console.info(new Date(), `Load App: ${loadAppResult}`);
                }
            );
        }
    );
};