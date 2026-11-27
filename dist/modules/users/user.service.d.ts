import type { Iuser, PublicUserRow, userUpdatePayload } from "./user.interface.js";
declare const createUserIntoDB: (payload: Iuser) => Promise<import("pg").QueryResult<PublicUserRow>>;
declare const getAllUsers: () => Promise<import("pg").QueryResult<PublicUserRow>>;
declare const getSingleUser: (id: string) => Promise<import("pg").QueryResult<PublicUserRow>>;
declare const userUpdateIntoDB: (payload: userUpdatePayload, id: string) => Promise<import("pg").QueryResult<PublicUserRow>>;
declare const deleteUserFromDB: (id: string) => Promise<import("pg").QueryResult<PublicUserRow>>;
export declare const userService: {
    createUserIntoDB: typeof createUserIntoDB;
    deleteUserFromDB: typeof deleteUserFromDB;
    userUpdateIntoDB: typeof userUpdateIntoDB;
    getAllUsers: typeof getAllUsers;
    getSingleUser: typeof getSingleUser;
};
export {};
//# sourceMappingURL=user.service.d.ts.map