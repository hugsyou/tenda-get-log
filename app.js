const { join } = require('path');
const express = require('express');
const cors = require('cors');
const { v4 } = require('uuid');
const helperRenderDataLog = require('./helper/helper.RenderDataLog.js');
const { CFG_EXPRESS_PORT, CFG_ROUTER_URL } = require('./config/config.System.js');
const controllerTZGet = require('./controller/controller.Tz.Get.js');
const controllerTendaLogGet = require('./controller/controller.TendaLog.Get.js');
const controllerSheetLogGet = require('./controller/controller.SheetLog.Get.js');
const controllerAccessLog = require('./controller/controller.AccessLog.Add.js');
const controllerTendaLogAll = require('./controller/controller.TendaLog.All.js');


let processingInterval = false;
setInterval(() => {
    if (!processingInterval) {
        processingInterval = true;
        controllerTendaLogGet()
            .then(r => {
                processingInterval = false;
                console.log(new Date(), 'Updated data: OK');
            })
            .catch(e => {
                processingInterval = false;
                console.log(new Date(), 'Updated data: Error');
                console.error(e);
            });
    }
}, 5000);


module.exports = () => {
    const app = express();

    app.use(cors());

    app.use(function (req, res, next) {
        req.requestId = v4();
        controllerAccessLog(req).catch(e => { console.log(e); });
        next();
    });

    app.use('/public', express.static(join(__dirname, '/html', 'public')));

    app.get('/',
        (req, res, next) => {
            res.sendFile(join(__dirname, '/html', '/index.html'));
        }
    );

    app.get('/api/v1/logs/all',
        async (req, res, next) => {
            try {
                const Result = await controllerTendaLogAll();
                res.status(200).json(Result);
                next();
            } catch (error) {
                next(error);
            }
        }
    );

    app.get('/api/v1/logs/router',
        async (req, res, next) => {
            try {
                const Result = await helperRenderDataLog(CFG_ROUTER_URL());
                res.status(200).json(Result);
                next();
            } catch (error) {
                next(error);
            }
        }
    );

    app.get('/api/v1/logs/database',
        async (req, res, next) => {
            try {
                const Result = await controllerTendaLogGet();
                res.status(200).json(Result);
                next();
            } catch (error) {
                next(error);
            }
        }
    );

    app.get('/api/v1/logs/googlesheet',
        async (req, res, next) => {
            try {
                const Result = await controllerSheetLogGet();
                res.status(200).send(Result);
                next();
            } catch (error) {
                next(error);
            }
        }
    );

    app.get('/api/v1/master/timezone',
        async (req, res, next) => {
            try {
                const Result = await controllerTZGet();
                res.status(200).json(Result);
                next();
            } catch (error) {
                next(error);
            }
        }
    );

    app.use(function (req, res, next) {
        res.status(404).end();
    });

    app.use(function (err, req, res, next) {
        console.error(err);
        controllerAccessLog(req, err.message).catch(e => { });
        res.status(500).end();
    });

    app.listen(CFG_EXPRESS_PORT(), '0.0.0.0', () => {
        console.info(`HTTP is listening http://localhost:${CFG_EXPRESS_PORT()}`);
    });

    return true;
};