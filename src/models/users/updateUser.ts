import { NextFunction } from "express";
import { IUserUpdateInput } from "~/@types/users";

async function updateUser(id: string, data: IUserUpdateInput, next: NextFunction) {
    try {
        const user = await prismaClient.user.update({
            select: { id: true },
            data,
            where: { id }
        });

        return {
            ...user
        };
    } catch (error: unknown) {
        next(error);
    }
}

export default updateUser;