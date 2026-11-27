import type { Request, Response } from "express";
import { profileService } from "./profile.service.js";

const createProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);
        console.log(result);

        res.status(201).json({
            success: true,
            message: "user profile create successfull!!",
            data: result.rows[0]
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("erorr form create user profile", error);
        res.status(500).json({
            success: false,
            message: "not create user profile",
            error: message
        });
    }
};

export const profileController = {
    createProfile,
};
