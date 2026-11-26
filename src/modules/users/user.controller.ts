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
            message: "Error creating user",
            error: error.message
        })
    }
}


const userDelete = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserFromDB(id as string);
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "not found user into DB!!"
            })
        }

        res.status(200).json({
            suscess: true,
            message: 'user delete successfull!',
            data: result.rows[0]
        });

    } catch (error: any) {
        console.error('user delete error!', error)
        res.status(500).json({
            suscess: false,
            message: "error deleting user",
            error: error.message
        })
    }
}

export const userController = {
    createUser,
    userDelete,

}