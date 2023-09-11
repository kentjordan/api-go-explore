import { NextFunction } from "express";

async function getAllItemsByUserId(id: string, next: NextFunction) {
    try {
        return await prismaClient.$queryRaw`
        SELECT i.id, p.title, p.description, p.photos, p.city, p.province
        FROM "Itinerary" as i
        JOIN "Place" as p
        ON i.place_id = p.id
        WHERE i.user_id = ${id}::UUID;
        `;
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllItemsByUserId;