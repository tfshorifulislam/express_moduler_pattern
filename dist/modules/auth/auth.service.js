import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { pool } from "../../db/index.js";
const loginIntoApplication = async (payload) => {
    const { email, password } = payload;
    const user = await pool.query(`
        SELECT id, name, age, email, password, is_active, role, created_at, updated_at
        FROM users
        WHERE email = $1
        `, [email]);
    const foundUser = user.rows[0];
    if (!foundUser) {
        throw new Error("Invalid credentials !!");
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
        throw new Error("do not match password!!");
    }
    if (!foundUser.is_active) {
        throw new Error("Do not have access!!");
    }
    if (!config.jwt_private_key) {
        throw new Error("JWT private key is not configured");
    }
    const jwtPayload = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
    };
    const accessToken = jwt.sign(jwtPayload, config.jwt_private_key, {
        expiresIn: "1d",
    });
    const { password: _password, ...userWithoutPassword } = foundUser;
    return { accessToken, user: userWithoutPassword };
};
export const authService = {
    loginIntoApplication,
};
//# sourceMappingURL=auth.service.js.map