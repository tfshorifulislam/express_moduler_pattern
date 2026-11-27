import type { Request, Response } from "express";
declare const createUser: (req: Request, res: Response) => Promise<void>;
declare const getAllUsers: (_req: Request, res: Response) => Promise<void>;
declare const getSingleUser: (req: Request, res: Response) => Promise<void>;
declare const userUpdateIntoDB: (req: Request, res: Response) => Promise<void>;
declare const userDelete: (req: Request, res: Response) => Promise<void>;
export declare const userController: {
    createUser: typeof createUser;
    getAllUsers: typeof getAllUsers;
    userUpdateIntoDB: typeof userUpdateIntoDB;
    userDelete: typeof userDelete;
    getSingleUser: typeof getSingleUser;
};
export {};
//# sourceMappingURL=user.controller.d.ts.map