import { NextFunction } from "express";

const getVisitedPlacesCount = async (next: NextFunction) => {
    try {
        const [{ count: visited_count }] = await prismaClient.$queryRaw<{ count: number }[]>`
            SELECT COUNT(*)
            FROM (
                SELECT user_id
                FROM "VisitedPlace"
                GROUP BY user_id
            ) AS v;
        `;
        return visited_count;
    } catch (error: unknown) {
        next(error);
    }
}

export default getVisitedPlacesCount;