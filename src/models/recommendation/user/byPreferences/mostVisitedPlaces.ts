import { IUserRecommendationByItsPreferences } from "./models";

// Most VISITED place based on user "preference"
export const mostVisitedPlacesByPreferences = async (user_id: string, limit: number) => {
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
                LIMIT ${limit}`;
}
