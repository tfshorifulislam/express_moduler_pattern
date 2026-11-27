import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import type { Iuser, PublicUserRow, userUpdatePayload } from "./user.interface.js";

const PUBLIC_USER_COLUMNS = "id, name, age, email, is_active, role, created_at, updated_at";

// create user into db
const createUserIntoDB = async (payload: Iuser) => {
    const { name, email, password, age, role } = payload;
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query<PublicUserRow>(
        `
        INSERT INTO users (name, email, password, age, role)
        VALUES ($1, $2, $3, $4, COALESCE($5, 'user'))
        RETURNING ${PUBLIC_USER_COLUMNS}
        `,
        [name, email, hashPassword, age ?? null, role ?? null]
    );

    return result;
};

// get all user from db;
const getAllUsers = async () => {
    const result = await pool.query<PublicUserRow>(
        `
        SELECT ${PUBLIC_USER_COLUMNS} FROM users
        `
    );

    return result;
};

// get single user from db;
const getSingleUser = async (id: string) => {
    const result = await pool.query<PublicUserRow>(
        `
        SELECT ${PUBLIC_USER_COLUMNS} FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result;
};

// user update into db;
const userUpdateIntoDB = async (payload: userUpdatePayload, id: string) => {
    console.log(payload);
    const { name, email, password, age, is_Active } = payload;
    const hashPassword = password ? await bcrypt.hash(password, 10) : null;

    const result = await pool.query<PublicUserRow>(
        `
        UPDATE users
        SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        is_Active = COALESCE($5, is_Active),
        updated_at = NOW()
        WHERE id = $6
        RETURNING ${PUBLIC_USER_COLUMNS}
        `,
        [name ?? null, email ?? null, hashPassword, age ?? null, is_Active ?? null, id]
    );

    return result;
};

// user delete into DB
const deleteUserFromDB = async (id: string) => {
    const result = await pool.query<PublicUserRow>(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING ${PUBLIC_USER_COLUMNS}
        `,
        [id]
    );

    return result;
};

export const userService = {
    createUserIntoDB,
    deleteUserFromDB,
    userUpdateIntoDB,
    getAllUsers,
    getSingleUser
};
