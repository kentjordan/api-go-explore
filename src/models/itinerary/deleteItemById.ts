import { NextFunction } from "express";

async function deleteItemById(id: string, user_id: string, next: NextFunction) {
    try {
        const item = await prismaClient.itinerary.delete({
            select: { id: true },
            where: {
                id,
                user_id
            }
        });

        return {
            ...item
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteItemById;