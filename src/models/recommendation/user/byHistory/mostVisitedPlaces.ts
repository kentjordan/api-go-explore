import { IUserRecommendationByItsHistory } from "./models";

export const mostVisitedPlacesByHistory = async (user_id: string, limit: number) => {
    return await prismaClient.$queryRaw<IUserRecommendationByItsHistory>`
                SELECT P.id, P.title, P.category, P.photos, P.description, P.province, P.city, UVP2.visited_count
                FROM "Place" AS P
                INNER JOIN
                    (SELECT VP.place_id, VP.visited_count
                    FROM 
                        (SELECT place_id, COUNT(place_id) AS visited_count
                        FROM "VisitedPlace"
                        GROUP BY place_id) AS VP
                    INNER JOIN
                        (SELECT user_id, place_id 
                        FROM "VisitedPlace"
                        WHERE user_id = ${user_id}::UUID
                        GROUP BY user_id, place_id) AS UVP
                    ON UVP.place_id = VP.place_id
                    ORDER BY VP.visited_count DESC) AS UVP2
                ON UVP2.place_id = P.id
                LIMIT ${limit}
        `;
}
