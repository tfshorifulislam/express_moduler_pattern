import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

//create user ;
router.post('/', userController.createUser)

// user delete;
router.delete('/:id', userController.userDelete )

export const  userRoute = router;