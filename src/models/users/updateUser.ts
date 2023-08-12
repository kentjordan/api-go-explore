import { NextFunction } from "express";
import { IUserUpdateInput } from "~/@types/users";

async function updateUser(id: string, data: IUserUpdateInput, next: NextFunction) {
    try {
        const db_res = await prismaClient.user.update({
            select: { id: true },
            data,
            where: { id }
        });

        return {
            ...db_res,
            isUpdated: true,
        };
    } catch (error: unknown) {
        next(error);
    }
}

export default updateUser;