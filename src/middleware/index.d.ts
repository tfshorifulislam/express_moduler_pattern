import type { AuthUserPayload } from "../types/index.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUserPayload | undefined;
        }
    }
}

export {};
