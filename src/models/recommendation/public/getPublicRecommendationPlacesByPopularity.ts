import { NextFunction } from "express";

const getPublicRecommendationPlacesByPopularity = async (next: NextFunction) => {

    try {
        return (await prismaClient.$queryRaw <any[]> `
            SELECT vp.place_Id AS place_id, p.category, p.title, p.province, p.city, p.barangay, p.created_at, COUNT(vp.place_Id) AS visited_count
            FROM "VisitedPlace" as vp
            JOIN "Place" as p ON vp.place_id = p.id
            GROUP BY vp.place_Id, p.title, p.province, p.city, p.barangay, p.category, p.created_at 
            ORDER BY visited_count DESC
            LIMIT 10;
        `).map((e, i) => ({
            ...e,
            visited_count: Number(e.visited_count)
        }));
    } catch (error: unknown) {
        next(error);
    }
}

export default getPublicRecommendationPlacesByPopularity;