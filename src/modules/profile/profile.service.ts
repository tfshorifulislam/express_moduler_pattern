import { pool } from "../../db/index.js";
import type { ProfileRow, profilePayload } from "./profile.interface.js";

const createProfileIntoDB = async (payload: profilePayload) => {
    const { user_id, bio, address, phone, gender } = payload;

    const user = await pool.query<{ id: number }>(
        `
        SELECT id FROM users
        WHERE id = $1
        `,
        [user_id]
    );

    if (user.rowCount === 0) {
        throw new Error("user not exist in the database!!");
    }

    const result = await pool.query<ProfileRow>(
        `
        INSERT INTO profile(
            user_id,
            bio,
            address,
            phone,
            gender
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
        [user_id, bio, address, phone, gender]
    );

    return result;
};

export const profileService = {
    createProfileIntoDB,
};
