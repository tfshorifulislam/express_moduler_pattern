import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

//create user ;
router.post('/', userController.createUser)

// user info update from DB;
router.put('/:id', userController.userUpdateIntoDB )

// user delete;
router.delete('/:id', userController.userDelete )

export const  userRoute = router;