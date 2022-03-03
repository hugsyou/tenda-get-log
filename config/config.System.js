const CFG_ROUTER_URL = () => process.env.ROUTER_URL || "http://192.168.0.1";
const CFG_EXPRESS_PORT = () => +process.env.EXPRESS_PORT || 8080;

module.exports = {
    CFG_ROUTER_URL,
    CFG_EXPRESS_PORT
}