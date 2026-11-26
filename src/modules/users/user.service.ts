import bcrypt from "bcryptjs";
import { pool } from "../../db"
import { Iuser } from "./user.interface";

// create user into db
const createUserIntoDB = async (payload: Iuser) => {

    const { name, email, password, age } = payload;
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, hashPassword, age]);

    delete result.rows[0].password;
    return result;
};

// user update into db;
const userUpdateIntoDB = async (payload: any, id: string) => {
    console.log(payload)
    const { name,email, password, age, is_Active } = payload;
    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_Active = COALESCE($4, is_Active),
        email = COALESCE($5, email)
        updated_at = NOW() 
        WHERE id=$6 RETURNING *
        `, [name ?? null, email ?? null, password ?? null, age ?? null, is_Active ?? null, id]);
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
}

export const userService = {
    createUserIntoDB,
    deleteUserFromDB,
    userUpdateIntoDB
}