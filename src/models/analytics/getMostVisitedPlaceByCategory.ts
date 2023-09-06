
import { NextFunction } from "express";

interface IPlaceOverallMostVisitedByCategory {
    place_id: string,
    category: string,
    title: string,
    province: string,
    city: string,
    visited_count: number
}

async function getMostVisitedPlaceByCategory(next: NextFunction, limit: number = 5, category: string) {
    try {

        const mostVisitedPlacesByCategory = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisitedByCategory>>`
            SELECT place_id, p.category, p.title, p.province, p.city, COUNT(place_Id) as visited_count
            FROM "VisitedPlace" as vp JOIN "Place" as p ON vp.place_id = p.id
            WHERE p.category = ${category}
            GROUP BY vp.place_id, p.category, p.title, p.province, p.city
            ORDER BY visited_count DESC
            LIMIT ${limit};
        `
        return mostVisitedPlacesByCategory.map((e, i) => ({
            ...e,
            visited_count: parseInt(`${e.visited_count}`)
        }));

    } catch (error: unknown) {
        next(error);
    }
}

export default getMostVisitedPlaceByCategory;