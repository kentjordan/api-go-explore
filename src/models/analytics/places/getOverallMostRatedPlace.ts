
import { NextFunction } from "express";

interface IPlaceMostRated {
    place_id: string,
    category: string,
    title: string,
    province: string,
    city: string,
    visited_count: number
}

async function getOverallMostRatedPlace(next: NextFunction, limit: number = 5) {
    try {

        return await prismaClient.$queryRaw <IPlaceMostRated[]>
            `
        SELECT fb.place_id, p.title, p.province, p.city, p.category, AVG(fb.rating) as avg_rating
        FROM  "Feedback" as fb
        JOIN "Place" as p
        ON p.id = fb.place_id
        GROUP BY fb.place_id, p.title,p.province, p.city,  p.category
        ORDER BY avg_rating DESC
        LIMIT ${limit};
        `
    } catch (error: unknown) {
        next(error);
    }
}

export default getOverallMostRatedPlace;