import { Request, Response } from "express";
import { userService } from "./user.service";
import { Result } from "pg";
import { error } from "node:console";

// create user into db;
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

// get all user from db;
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        console.log(result);
        res.status(200).json({
            success: true,
            message: "all users fetch successfully done!!",
            data: result.rows
        })
    } catch (error: any) {
        console.error('get all user error!', error)
        res.status(500).json({
            suscess: false,
            message: "error getting user info into db!!",
            error: error.message
        })
    }
}


// update user info from db;
const userUpdateIntoDB = async (req:Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await userService.userUpdateIntoDB(req.body, id as string)
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "not found user into DB!!"
            })
        }

        res.status(200).json({
            suscess: true,
            message: 'user update successfull!',
            data: result.rows[0]
        });
    }catch (error: any) {
        console.error('user delete error!', error)
        res.status(500).json({
            suscess: false,
            message: "error updating user info into db!!",
            error: error.message
        })
    }
}


// delete user from db;
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
    getAllUsers,
    userUpdateIntoDB,
    userDelete,

}