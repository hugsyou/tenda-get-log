const heplerRefactorDataLog = (inputLogString = "", inputTZz = "+0700") => {
    if (RegExp(/^([0-9]{3,}\s{2}[0-9]{4}\-[0-9]{2}\-[0-9]{2}\s{1}[0-9]{2}\:[0-9]{2}:[0-9]{2})/).test(inputLogString)) {
        const detail = inputLogString.split(/^([0-9]{3,}\s{2}[0-9]{4}\-[0-9]{2}\-[0-9]{2}\s{1}[0-9]{2}\:[0-9]{2}:[0-9]{2})/);
        // 0:''
        // 1:'001  2022-01-04 10:29:17'
        // 2:' Network alarm support lan1 up'
        if (detail.length > 2) {
            if (detail[0] === "") {
                if (detail[1]) {
                    if (RegExp(/[0-9]{3,}\s{2}/).test(detail[1])) {
                        const cutLineNumber = detail[1].split(/\s{2}/);
                        if (cutLineNumber.length === 2) {
                            const getLineNumber = cutLineNumber[0].replace(/\s/, "");
                            if (RegExp(/^[0-9]{3,}/).test(getLineNumber) && getLineNumber.length >= 3) {
                                const cutDate = cutLineNumber[1].split(/\s{1}/);
                                if (cutDate.length === 2) {
                                    const getDate = cutDate[0].replace(/\s/, "");
                                    if (RegExp(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/).test(getDate) && getDate.length === 10) {
                                        const getTime = cutDate[1];
                                        if (RegExp(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/).test(getTime) && getTime.length === 8) {
                                            const DataOut = {
                                                lineNumber: Number(getLineNumber),
                                                lineNumberString: getLineNumber,
                                                dateString: getDate,
                                                timeString: getTime,
                                                dateTime: new Date(`${getDate} ${getTime} ${inputTZz}`),
                                                details: detail[2].replace(/^\s+/g, "").replace(/\s{2,}/g, " ")
                                            };
                                            return DataOut;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};


module.exports = heplerRefactorDataLog;