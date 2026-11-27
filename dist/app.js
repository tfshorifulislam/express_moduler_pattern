import express, {} from "express";
import { userRoute } from "./modules/users/user.route.js";
import { profileRouter } from "./modules/profile/profile.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import logger from "./middleware/logger.js";
import globalErrorHandeler from "./middleware/globalErrorHandeler.js";
import cors from "cors";
const corsOptions = {
    origin: ["http://example.com"],
    optionsSuccessStatus: 200
};
const app = express();
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));
// home route;
app.get("/", (_req, res) => {
    res.send("Server is running!!");
});
// user route
app.use("/api/v1/users", userRoute);
// profile route;
app.use("/api/v1/profile", profileRouter);
// auth route;
app.use("/api/v1/auth", authRouter);
// global error handler
app.use(globalErrorHandeler);
export default app;
//# sourceMappingURL=app.js.map