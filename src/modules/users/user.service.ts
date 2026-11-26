import bcrypt from "bcryptjs";
import {pool} from "../../db"

// create user into db
const createUserIntoDB = async (payload: any) => {
  
    const {name, email, password, age} = payload;
    const hashPassword = await bcrypt.hash(password,10);

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, hashPassword, age]);
        
        delete result.rows[0].password;
        return result;
};

const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `,[id])
        
    return result;
}

export const userService = {
    createUserIntoDB,
    deleteUserFromDB,
}