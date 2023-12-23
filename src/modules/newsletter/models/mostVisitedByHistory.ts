type MostVisitedByUserHistory = Array<{
    id: string,
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    visited_count: number
}>;

const mostVisitedByHistory = async (user_id: string) => {
    return await prismaClient.$queryRaw<MostVisitedByUserHistory>`
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
                        WHERE user_id = 'ce91a506-b43d-4631-bb28-46b50381698d'::UUID
                        GROUP BY user_id, place_id) AS UVP
                    ON UVP.place_id = VP.place_id) AS UVP2
                ON UVP2.place_id = P.id
                ORDER BY UVP2.visited_count DESC
                LIMIT 5`;
}