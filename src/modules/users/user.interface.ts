export interface Iuser {
    name: string;
    email: string;
    password: string;
    age: number | null;
    role?: string | undefined;
}

export interface userUpdatePayload {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    age?: number | null | undefined;
    is_Active?: boolean | undefined;
}

export interface PublicUserRow {
    id: number;
    name: string | null;
    age: number | null;
    email: string;
    is_active: boolean;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserRow extends PublicUserRow {
    password: string;
}
