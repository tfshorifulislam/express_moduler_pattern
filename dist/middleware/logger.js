import fs from "fs";
// logger.txt file for monitoring;
const logger = (req, _res, next) => {
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`;
    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            console.error(err);
        }
    });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map