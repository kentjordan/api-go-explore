
import { NextFunction } from "express";

interface IPlaceOverallMostVisitedPlaceByCategory {
    place_id: string,
    category: string,
    title: string,
    province: string,
    city: string,
    visited_count: number
}

async function getMostVisitedPlaceByCategory(next: NextFunction, limit: number = 5, category: string) {
    try {

        // const mostVisitedPlacesByCategory = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisitedPlaceByCategory>>`
        //     SELECT place_id, p.category, p.title, p.province, p.city, COUNT(place_Id) as visited_count
        //     FROM "VisitedPlace" as vp JOIN "Place" as p ON vp.place_id = p.id
        //     WHERE p.category = ${category.toLowerCase()}
        //     GROUP BY vp.place_id, p.category, p.title, p.province, p.city
        //     ORDER BY visited_count DESC
        //     LIMIT ${limit}`;

        const withCount = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisitedPlaceByCategory>>`
                SELECT 
                    P.id AS place_id, P.title, P.category, P.province, P.city, VP.visited_count
                FROM 
                    "Place" AS P
                LEFT JOIN
                    (SELECT 
                            place_id, COUNT(place_id) AS visited_count
                    FROM 
                        "VisitedPlace"
                    GROUP BY 
                        place_id) AS VP
                    ON 
                        P.id = VP.place_id
                WHERE
                     P.category = ${category} AND VP.visited_count IS NOT NULL
                ORDER
                     BY VP.visited_count DESC
                LIMIT ${limit}`;

        const withoutCount = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisitedPlaceByCategory>>`
                SELECT 
                    P.id AS place_id, P.title, P.category, P.province, P.city, VP.visited_count
                FROM 
                    "Place" AS P
                LEFT JOIN
                    (SELECT 
                            place_id, COUNT(place_id) AS visited_count
                    FROM 
                        "VisitedPlace"
                    GROUP 
                        BY place_id) AS VP
                    ON 
                        P.id = VP.place_id
                WHERE
                     P.category = ${category} AND VP.visited_count IS NULL
                ORDER
                     BY VP.visited_count ASC
                LIMIT ${limit}`;

        return [
            ...withCount,
            ...withoutCount
        ]

    } catch (error: unknown) {
        next(error);
    }
}

export default getMostVisitedPlaceByCategory;