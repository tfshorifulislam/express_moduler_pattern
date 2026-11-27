import { Request, Response } from "express";
import { authService } from "./auth.service";


const loginIntoApplication = async ( req: Request, res: Response) => {
    try {
        const result = await authService.loginIntoApplication(req.body);
        res.status(200).json({
            success: true,
            message: "login successfull !!",
            data: result
        })
    } catch (error: any) {
        console.error('login error form loginIntoApplication!!', error)
        res.status(500).json({
            suscess: false,
            message: "login failed!!",
            error: error.message
        })
    }
}

export const authController = {
    loginIntoApplication,
}