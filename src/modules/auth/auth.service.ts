import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";
import { loginInfo } from "./auth.interface";


const loginIntoApplication = async (payload : loginInfo) => {
    const {email, password} = payload;

    const user = await pool.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [email]);

    if(user.rowCount === 0) { 
       throw new Error("Invalid credentials !!") 
    };

    const matchPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!matchPassword){
        throw new Error('do not match password!!')
    };

    if(!user.rows[0].is_active){
        throw new Error ("Do not have access!!")
    };

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_private_key as string,{
        expiresIn: "1d",
    })

    delete user.rows[0].password;

    return {accessToken, user: user.rows[0]};
};


export const authService = {
    loginIntoApplication,
}