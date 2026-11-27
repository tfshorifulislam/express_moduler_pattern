import express, { Application, NextFunction, Request, Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import fs from "fs";

const app: Application = express();
app.use(express.json());

// logger.txt file for monatoring;
app.use((req: Request, res: Response, next: NextFunction) => {
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`;

    fs.appendFile('logger.txt', log, (err) => {
        console.log(err);
    });

    next();
})

// home route;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!!')
})

// user route
app.use('/api/v1/users', userRoute);

// profile route;
app.use('/api/v1/profile', profileRouter);

// auth route;
app.use('/api/v1/auth', authRouter)

export default app;
