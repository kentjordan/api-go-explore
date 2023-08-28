
import { NextFunction } from "express";

interface IPlaceOverallMostVisited {
    place_id: string,
    category: string,
    title: string,
    province: string,
    city: string,
    visited_count: number
}

async function getOverallMostVisitedPlace(next: NextFunction, limit: number = 5) {
    try {

        const overallMostVisitedPlace = await prismaClient.$queryRaw<Array<IPlaceOverallMostVisited>>
            `
            SELECT place_id, p.category, p.title, p.province, p.city, COUNT(place_id) AS visited_count
            FROM "VisitedPlace" AS vp
            INNER JOIN "Place" AS p ON vp.place_id = p.id
            GROUP BY vp.place_id, p.id
            ORDER BY visited_count DESC
            LIMIT ${limit};
            `;

        return overallMostVisitedPlace.map((e) => {
            return {
                ...e,
                visited_count: parseInt(`${e.visited_count}`)
            }
        });

    } catch (error: unknown) {
        next(error);
    }
}

export default getOverallMostVisitedPlace;