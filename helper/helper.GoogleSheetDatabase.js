const { join } = require("path");
const { Database } = require("sheetsql");
const { CFG_GOOGLE_SHEET_CREDENTIALS, CFG_GOOGLE_SHEET_ID } = require("../config/config.GoogleSheet.js");

const googleCredentialsJsonFile = CFG_GOOGLE_SHEET_CREDENTIALS();
const spreadsheetId = CFG_GOOGLE_SHEET_ID();
const keyFile = join(__dirname, `../resources/${googleCredentialsJsonFile}`);

const helperGoogleSheetDatabase = async () => {
    if (!googleCredentialsJsonFile || !spreadsheetId) {
        throw Error(`Google Sheet is not set`);
    }
    else {
        const db = new Database({
            db: spreadsheetId,
            table: 'Sheet1', // optional, default = Sheet1
            keyFile: keyFile,
            cacheTimeoutMs: (1000 * 60) * 3, // optional, default = 5000
        });
    
        await db.load();
    
        return db;
    }
};


module.exports = helperGoogleSheetDatabase;