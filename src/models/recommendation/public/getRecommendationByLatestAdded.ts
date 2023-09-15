import { NextFunction } from "express";

const getRecommendationByLatestAdded = async (next: NextFunction) => {
    try {
        return await prismaClient.$queryRaw<any[]>`
            SELECT id AS place_id, category, title, province, city, barangay, category, created_at
            FROM "Place"
            ORDER BY created_at DESC
            LIMIT 10;`
    } catch (error: unknown) {
        next(error);
    }
}

export default getRecommendationByLatestAdded;