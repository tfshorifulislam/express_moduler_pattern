import type { Request, Response } from "express";
import { userService } from "./user.service.js";

const getErrorMessage = (error: unknown): string =>
    error instanceof Error ? error.message : "Unknown error";

const getParamId = (req: Request, res: Response): string | null => {
    const id = req.params.id;
    if (typeof id !== "string" || !id.trim()) {
        res.status(400).json({
            success: false,
            message: "Valid user id is required"
        });
        return null;
    }
    return id;
};

// create user into db;
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const user = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "user create successfull",
            data: user,
        });
    } catch (error: unknown) {
        console.error("Error creating user", error);
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: getErrorMessage(error)
        });
    }
};

// get all user from db;
const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await userService.getAllUsers();

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "no user found!!",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "all users fetch successfully done!!",
            data: result.rows
        });
    } catch (error: unknown) {
        console.error("get all user error!", error);
        res.status(500).json({
            success: false,
            message: "error getting user info into db!!",
            error: getErrorMessage(error)
        });
    }
};

const getSingleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getParamId(req, res);
        if (!id) return;

        const result = await userService.getSingleUser(id);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "no user found!!",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "all users fetch successfully done!!",
            data: result.rows
        });
    } catch (error: unknown) {
        console.error("get user error!", error);
        res.status(500).json({
            success: false,
            message: "error getting user info into db!!",
            error: getErrorMessage(error)
        });
    }
};

// update user info from db;
const userUpdateIntoDB = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getParamId(req, res);
        if (!id) return;

        const result = await userService.userUpdateIntoDB(req.body, id);
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "not found user into DB!!"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "user update successfull!",
            data: result.rows[0]
        });
    } catch (error: unknown) {
        console.error("user update error!", error);
        res.status(500).json({
            success: false,
            message: "error updating user info into db!!",
            error: getErrorMessage(error)
        });
    }
};

// delete user from db;
const userDelete = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getParamId(req, res);
        if (!id) return;

        const result = await userService.deleteUserFromDB(id);
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "not found user into DB!!"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "user delete successfull!",
            data: result.rows[0]
        });
    } catch (error: unknown) {
        console.error("user delete error!", error);
        res.status(500).json({
            success: false,
            message: "error deleting user",
            error: getErrorMessage(error)
        });
    }
};

export const userController = {
    createUser,
    getAllUsers,
    userUpdateIntoDB,
    userDelete,
    getSingleUser
};
