import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import { Role } from "../types";

const auth = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            // check is is exist;
            const token = req.headers.authorization;

            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                })
            };

            // check jwt token is valid;
            const verifyToken = jwt.verify(token as string, config.jwt_private_key as string) as JwtPayload;

            //  check user have db;
            const user = await pool.query(`
        SELECT * FROM users
        WHERE email = $1;
        `, [verifyToken.email]);
            delete user.rows[0].password;

            if (user.rowCount === 0) {
             return   res.status(404).json({
                    success: false,
                    message: "user not found!!"
                })
            };

            //  check user is_active or not;
            if (!user.rows[0].is_active) {
              return  res.status(403).json({
                    success: false,
                    message: "Forbidden!!"
                })
            };

            // roles check logic
            if (roles.length &&
                !roles.includes(user.rows[0].role)
            ) {
             return   res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                })
            };

            req.user = verifyToken;

            next();
        } catch (error) {
            next(error)
        }
    };
}
export default auth;