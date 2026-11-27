import type { ProfileRow, profilePayload } from "./profile.interface.js";
declare const createProfileIntoDB: (payload: profilePayload) => Promise<import("pg").QueryResult<ProfileRow>>;
export declare const profileService: {
    createProfileIntoDB: typeof createProfileIntoDB;
};
export {};
//# sourceMappingURL=profile.service.d.ts.map