import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import { isRole } from "../types/index.js";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                });
                return;
            }
            const token = authHeader.startsWith("Bearer ")
                ? authHeader.slice(7).trim()
                : authHeader.trim();
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                });
                return;
            }
            if (!config.jwt_private_key) {
                res.status(500).json({
                    success: false,
                    message: "JWT private key is not configured"
                });
                return;
            }
            const decoded = jwt.verify(token, config.jwt_private_key);
            if (typeof decoded === "string" || typeof decoded.email !== "string") {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                });
                return;
            }
            const userResult = await pool.query(`
                SELECT id, name, email, role, is_active FROM users
                WHERE email = $1;
                `, [decoded.email]);
            const foundUser = userResult.rows[0];
            if (!foundUser) {
                res.status(404).json({
                    success: false,
                    message: "user not found!!"
                });
                return;
            }
            if (!foundUser.is_active) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden!!"
                });
                return;
            }
            if (!isRole(foundUser.role) || (roles.length && !roles.includes(foundUser.role))) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access !!"
                });
                return;
            }
            req.user = {
                ...decoded,
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map