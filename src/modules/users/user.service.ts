import bcrypt from "bcryptjs";
import { pool } from "../../db"
import { Iuser, userUpdatePayload } from "./user.interface";

// create user into db
const createUserIntoDB = async (payload: Iuser) => {

    const { name, email, password, age, role } = payload;
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age, role)
        VALUES ($1, $2, $3, $4 , COALESCE($5, 'user')) RETURNING *
        `, [name, email, hashPassword, age, role]);

    delete result.rows[0].password;
    return result;
};

// get all user from db;
const getAllUsers = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `);
    delete result.rows[0].password;
    return result;
}

// get signle user from db;
const getSingleUser = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
        `,[id]);
    return result
};

// user update into db;
const userUpdateIntoDB = async (payload: userUpdatePayload, id: string) => {
    console.log(payload)
    const { name,email, password, age, is_Active } = payload;
    const hashPassword = password ? await bcrypt.hash(password, 10) : null;

    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        is_Active = COALESCE($5, is_Active),
        updated_at = NOW()
        WHERE id=$6
        RETURNING id, name, age, email, is_active, created_at, updated_at
        `, [name ?? null, email ?? null, hashPassword , age ?? null, is_Active ?? null, id]);
        return result;
}

// user delete into DB
const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `, [id])

    return result;
};

export const userService = {
    createUserIntoDB,
    deleteUserFromDB,
    userUpdateIntoDB,
    getAllUsers,
    getSingleUser
}