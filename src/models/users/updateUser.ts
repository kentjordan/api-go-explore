import { NextFunction } from "express";
import { IUserUpdateInput } from "~/@types/users";

async function updateUser(id: string, data: IUserUpdateInput, next: NextFunction) {
    try {
        const db_res = await prismaClient.user.update({
            data,
            where: { id }
        });

        return {
            isUpdated: true,
        };
    } catch (error: unknown) {
        next(error);
    }
}

export default updateUser;