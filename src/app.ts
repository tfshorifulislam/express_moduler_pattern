import express, { Application, NextFunction, Request, Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandeler from "./middleware/globalErrorHandeler";
import cors from 'cors';

const corsOptions = {
  origin: ['http://example.com'],
  optionsSuccessStatus: 200
}

const app: Application = express();
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));

// home route;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!!')
})

// user route
app.use('/api/v1/users', userRoute);

// profile route;
app.use('/api/v1/profile', profileRouter);

// auth route;
app.use('/api/v1/auth', authRouter);

// global error handler
app.use(globalErrorHandeler)

export default app;
