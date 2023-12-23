type MostRatedByUserHistory = Array<{
    id: string,
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    avg_rating: number
}>;

const mostRatedByHistory = async (user_id: string) => {

    return await prismaClient.$queryRaw<MostRatedByUserHistory>`
                SELECT P.id, P.title, P.category, P.photos, P.description, P.province, P.city, avg_rating
                FROM
                    (SELECT MRP.place_id, MRP.avg_rating
                    FROM 
                        (SELECT place_id, ROUND(AVG(rating)::numeric, 2) AS avg_rating
                        FROM "Feedback"
                        GROUP BY place_id) AS MRP
                    INNER JOIN
                        (SELECT user_id, place_id 
                        FROM "VisitedPlace"
                        WHERE user_id = ${user_id}::UUID
                        GROUP BY user_id, place_id) AS UVP
                    ON MRP.place_id = UVP.place_id) AS MOST_RATED_BY_USER_HISTORY
                INNER JOIN "Place" AS P
                ON P.id = MOST_RATED_BY_USER_HISTORY.place_id
                ORDER BY avg_rating DESC
                LIMIT 5`;
}

export default mostRatedByHistory;