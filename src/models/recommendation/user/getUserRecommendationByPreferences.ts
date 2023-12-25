import { NextFunction } from "express";

export type IUserRecommendationByItsPreferences = Array<{
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    visited_count: number
}>

const mostVisitedPlaces = async (user_id: string) => {
    return await prismaClient.$queryRaw<Array<IUserRecommendationByItsPreferences>>`
                SELECT P.title, P.category, P.photos, P.description, P.province, P.city, TV.visited_count
                FROM "Place" AS P
                INNER JOIN 
                    (SELECT place_id, COUNT(place_id) AS visited_count FROM "VisitedPlace"
                    GROUP BY place_id) AS TV
                ON TV.place_id = P.id
                WHERE P.category IN 
                    (SELECT LOWER(preferenced_categories) AS preferenced_categories
                    FROM
                        (SELECT UNNEST(preferenced_categories) AS preferenced_categories
                        FROM "Preferences" WHERE user_id = ${user_id}::UUID))
                ORDER BY visited_count DESC
                LIMIT 10`;
}

// Most RATED place based on user "preference"
const mostRatedPlaces = async (user_id: string) => {
    return await prismaClient.$queryRaw<Array<IUserRecommendationByItsPreferences>>`
                SELECT
                    M.*
                FROM
                    (SELECT P.*, most_rated_place.avg_rating
                    FROM
                        "Place" AS P
                    INNER JOIN
                        (SELECT
                                place_id,
                                AVG(rating) AS avg_rating
                            FROM
                                "Feedback"
                            GROUP BY
                                place_id) AS most_rated_place
                    ON
                        P.id = most_rated_place.place_id) AS M
                WHERE
                    M.category IN
                        (SELECT
                            UNNEST(preferenced_categories) AS user_preference
                        FROM
                            "Preferences"
                        WHERE
                            user_id = ${user_id}::UUID)
                ORDER BY avg_rating DESC
                LIMIT 10`;
}

// Most VISITED place based on user "preference"
const getUserRecommendationByPreferences = async (type: "most-visited" | "most-rated", user_id: string, next: NextFunction) => {

    try {
        if (type === 'most-visited') {
            return await mostVisitedPlaces(user_id);
        }

        if (type === 'most-rated') {
            return await mostRatedPlaces(user_id);
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getUserRecommendationByPreferences;