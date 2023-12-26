
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

        const withCount = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisited>>`
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
                    VP.visited_count IS NOT NULL
                ORDER
                     BY VP.visited_count DESC
                LIMIT ${limit}`;

        const withoutCount = await prismaClient.$queryRaw <Array<IPlaceOverallMostVisited>>`
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
                    VP.visited_count IS NULL
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

export default getOverallMostVisitedPlace;