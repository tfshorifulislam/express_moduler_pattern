export interface Iuser {
    name: string;
    email: string;
    password: string;
    age: number | null;
    role?: string
}

export interface userUpdatePayload {
    name: string,
    email: string,
    password:string,
    age:number,
    is_Active: boolean
}