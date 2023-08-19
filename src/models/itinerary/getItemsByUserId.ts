import { NextFunction } from "express";

async function getAllItemsByUserId(id: string, next: NextFunction) {
    try {
        const items = await prismaClient.$queryRaw`SELECT * FROM "Itinerary" WHERE user_id = ${id}::UUID`;
        return items;
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllItemsByUserId;