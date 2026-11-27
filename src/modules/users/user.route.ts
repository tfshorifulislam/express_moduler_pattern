import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth"
import { USER_ROLE } from "../../types";


const router = Router();

//create user ;
router.post('/', userController.createUser)

// user info update from DB;
router.put('/:id', auth(USER_ROLE.admin), userController.userUpdateIntoDB)

// get all user from db;
router.get('/', auth(USER_ROLE.admin), userController.getAllUsers);

// get single user;
router.get('/:id', userController.getSingleUser)

// user delete;
router.delete('/:id', auth(USER_ROLE.admin), userController.userDelete)

export const userRoute = router;