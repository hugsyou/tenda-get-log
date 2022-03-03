const CFG_GOOGLE_SHEET_CREDENTIALS = () => process.env.GOOGLE_SHEET_CREDENTIALS || "";
const CFG_GOOGLE_SHEET_ID = () => process.env.GOOGLE_SHEET_ID || "";


module.exports = {
    CFG_GOOGLE_SHEET_CREDENTIALS,
    CFG_GOOGLE_SHEET_ID
}