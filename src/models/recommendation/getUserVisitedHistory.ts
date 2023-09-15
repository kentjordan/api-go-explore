const getUserVisitedHistory = async (user_id: string) => {
    const userVisitedHistory = await prismaClient.$queryRaw<{ category: string, visited_count: number }[]>`
        SELECT category, count(*) as visited_count
        FROM (SELECT user_id, place_id, p.category, count(*)
            FROM "VisitedPlace" AS vp
            JOIN "Place" AS p
            ON vp.place_id = p.id
            WHERE user_id = ${user_id}::UUID
            GROUP BY 1, 2, 3
            ORDER BY count DESC) AS history
        GROUP BY 1
        ORDER BY visited_count DESC
        LIMIT 10;`;

    return userVisitedHistory.map((e, i) => e.category);

}


export default getUserVisitedHistory;