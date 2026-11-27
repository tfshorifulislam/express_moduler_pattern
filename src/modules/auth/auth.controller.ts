import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const loginIntoApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await authService.loginIntoApplication(req.body);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "login successfull !!",
            data: result
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("login error form loginIntoApplication!!", error);
        res.status(500).json({
            success: false,
            message: "login failed!!",
            error: message
        });
    }
};

export const authController = {
    loginIntoApplication,
};
