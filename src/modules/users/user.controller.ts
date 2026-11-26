import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const user = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "user create successfull",
            data: user,
        })
    } catch (error: any) {
        console.error("Error creating user", error)
        res.status(500).json({
            success: false,
            message:"Error creating user",
            error: error.message
        })
    }
}

export const userController = {
    createUser,
}