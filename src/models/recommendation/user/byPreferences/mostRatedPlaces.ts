import { IUserRecommendationByItsPreferences } from "./models";

// Most RATED place based on user "preference"
export const mostRatedPlacesByPreferences = async (user_id: string, limit: number) => {
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
                LIMIT ${limit}`;
}
