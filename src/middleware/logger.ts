import type { NextFunction, Request, Response } from "express";
import fs from "fs";

// logger.txt file for monitoring;
const logger = (req: Request, _res: Response, next: NextFunction): void => {
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`;

    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            console.error(err);
        }
    });

    next();
};

export default logger;
