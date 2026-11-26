import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

//create user ;
router.post('/', userController.createUser)

// user info update from DB;
router.put('/:id', userController.userUpdateIntoDB )

// get all user from db;
router.get('/', userController.getAllUsers);

// get single user;
router.get('/:id', userController.getSingleUser)

// user delete;
router.delete('/:id', userController.userDelete )

export const  userRoute = router;