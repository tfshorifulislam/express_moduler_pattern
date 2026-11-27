import type { loginInfo } from "./auth.interface.js";
declare const loginIntoApplication: (payload: loginInfo) => Promise<{
    accessToken: string;
    user: {
        id: number;
        name: string | null;
        age: number | null;
        email: string;
        is_active: boolean;
        role: string;
        created_at: Date;
        updated_at: Date;
    };
}>;
export declare const authService: {
    loginIntoApplication: typeof loginIntoApplication;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map