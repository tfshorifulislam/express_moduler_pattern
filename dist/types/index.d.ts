import type { JwtPayload } from "jsonwebtoken";
export type Role = "admin" | "agent" | "user";
export declare const USER_ROLE: {
    readonly admin: "admin";
    readonly user: "user";
};
export interface AuthUserPayload extends JwtPayload {
    id: number;
    name: string | null;
    email: string;
    role: Role;
}
export declare const isRole: (value: string) => value is Role;
//# sourceMappingURL=index.d.ts.map