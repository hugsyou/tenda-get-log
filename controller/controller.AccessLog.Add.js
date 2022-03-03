const modelHttpLogs = require("../model/model.HttpLogs.js");

/**
 * @param {import("express").Request} request 
 * @param {string} errors
 */
const controllerAccessLog = async (request, errors = null) => {
    const createAccessLog = await modelHttpLogs.create(
        {
            requestId: request.requestId,
            url: request.url,
            baseUrl: request.baseUrl,
            originalUrl: request.originalUrl,
            params: JSON.stringify(request.params),
            path: request.path,
            method: request.method,
            hostname: request.hostname,
            ipAddesss: request.ip,
            ipAddressForward: `${request.ips}`,
            userAgent: request.headers["user-agent"],
            errors: errors
        }
    );

    return createAccessLog;
};


module.exports = controllerAccessLog;