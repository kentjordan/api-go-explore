import { NextFunction } from "express";

async function deleteUserById(id: string, next: NextFunction) {

    try {
        const db_res = await prismaClient.user.delete({
            select: { id: true },
            where: { id }
        });

        return {
            ...db_res,
            isDeleted: true
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteUserById;