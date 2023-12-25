import { IUserRecommendationByItsHistory } from "./models";

// Most RATED place based on user "history"
export const mostRatedPlacesByHistory = async (user_id: string, limit: number) => {
    return await prismaClient.$queryRaw<IUserRecommendationByItsHistory>`
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
                        (SELECT P.category
                        FROM
                            "Place" AS P
                        INNER JOIN
                            (SELECT DISTINCT user_id, place_id from "VisitedPlace"
                            WHERE user_id = ${user_id}::UUID) AS user_hist
                        ON
                            P.id = user_hist.place_id)
                ORDER BY avg_rating DESC
                LIMIT ${limit}`;
}

