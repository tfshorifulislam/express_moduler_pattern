import { Request, Response } from "express";
import { profileService } from "./profile.service";



const createProfile = async (req: Request, res: Response) => {

    try {
        const result = await profileService.createProfileIntoDB(req.body)
        console.log(result);

        res.status(201).json({
            success: true,
            message: "user profile create successfull!!",
            data: result.rows[0]
        })
    } catch (error : any) {
        console.error('erorr form create user profile' , error);
        res.status(500).json({
            success: false,
            message: "not create user profile",
            error: error.message
        })
    }
}

export const profileController = {
    createProfile,
}