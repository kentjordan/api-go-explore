
import { NextFunction } from "express";

interface IPlaceMostRatedByCategory {
    place_id: string,
    category: string,
    title: string,
    province: string,
    city: string,
    visited_count: number
}

async function getMostRatedPlaceByCategory(next: NextFunction, limit: number = 5, category: string) {
    try {

        const withCount = await prismaClient.$queryRaw <IPlaceMostRatedByCategory[]>`
            SELECT 
                P.id AS place_id, P.title, P.category, P.province, P.city, ROUND(most_rated.avg_rating::NUMERIC, 2) AS avg_rating
            FROM 
                "Place" AS P
            LEFT JOIN
                (SELECT 
                    place_id, AVG(rating) AS avg_rating
                FROM
                    "Feedback"
                GROUP BY
                    place_id) AS most_rated
            ON P.id = most_rated.place_id
            WHERE 
                P.category= ${category} AND most_rated.avg_rating IS NOT NULL
            ORDER BY 
                most_rated.avg_rating DESC`;

        const withoutCount = await prismaClient.$queryRaw <IPlaceMostRatedByCategory[]>`
            SELECT 
                P.id AS place_id, P.title, P.category, P.province, P.city, ROUND(most_rated.avg_rating::NUMERIC, 2) AS avg_rating
            FROM 
                "Place" AS P
            LEFT JOIN
                (SELECT 
                    place_id, AVG(rating) AS avg_rating
                FROM
                    "Feedback"
                GROUP BY
                    place_id) AS most_rated
            ON P.id = most_rated.place_id
            WHERE 
                P.category= ${category} AND most_rated.avg_rating IS NULL
            ORDER 
                BY most_rated.avg_rating DESC`;

        return [
            ...withCount,
            ...withoutCount
        ]

    } catch (error: unknown) {
        next(error);
    }
}

export default getMostRatedPlaceByCategory;