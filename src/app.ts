import express, { Application, Request, Response } from "express"
import { userRoute } from "./modules/users/user.route";
const app: Application = express();
app.use(express.json());


// home route;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!!')
})

// user route
app.use('/api/v1/users', userRoute)

export default app;
