import { NextFunction } from "express";

async function deleteUserById(id: string, next: NextFunction) {

    try {
        const user = await prismaClient.user.delete({
            select: { id: true },
            where: { id }
        });

        return {
            ...user
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteUserById;