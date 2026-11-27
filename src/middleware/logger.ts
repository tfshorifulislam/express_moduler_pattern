import { NextFunction, request, Request, Response } from "express";
import fs from "fs";

// logger.txt file for monatoring;
const logger = async (req: Request, res: Response, next: NextFunction) => {
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`;

    fs.appendFile('logger.txt', log, (err) => {
        console.log(err);
    });

    next();
};

export default logger;