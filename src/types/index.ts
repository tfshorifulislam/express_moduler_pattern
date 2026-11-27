import type { JwtPayload } from "jsonwebtoken";

export type Role = "admin" | "agent" | "user";

export const USER_ROLE = {
    admin: "admin",
    user: "user"
} as const;

export interface AuthUserPayload extends JwtPayload {
    id: number;
    name: string | null;
    email: string;
    role: Role;
}

export const isRole = (value: string): value is Role => {
    return value === "admin" || value === "agent" || value === "user";
};
