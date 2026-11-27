export interface profilePayload {
    user_id: number;
    bio: string;
    address: string;
    phone: string;
    gender: string;
}

export interface ProfileRow {
    id: number;
    user_id: number;
    bio: string | null;
    address: string | null;
    phone: string | null;
    gender: string | null;
    created_at: Date;
    updated_at: Date;
}
