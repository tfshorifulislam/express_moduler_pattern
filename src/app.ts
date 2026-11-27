import express, { Application, Request, Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();
app.use(express.json());


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
