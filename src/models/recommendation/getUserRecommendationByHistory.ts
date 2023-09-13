import { NextFunction } from "express";

const getUserRecommendationByHistory = async (next: NextFunction) => {
    try {

        // const userVisitedPlaces = await prismaClient.$queryRaw<{ places_category: any[], visited_count: number }[]>
        //     `
        //         SELECT p.category as places_category, COUNT(p.category) as visited_count
        //         FROM "VisitedPlace" as vp
        //         JOIN "Place" as p
        //         ON vp.place_id = p.id
        //         WHERE vp.user_id = ${user_id}::UUID
        //         GROUP BY p.category
        //         ORDER BY visited_count DESC
        //         LIMIT 10;
        //     `;

        // const user_visited_places = userVisitedPlaces.map((e, i) => e.places_category);


    } catch (error: unknown) {

    }
}

export default getUserRecommendationByHistory;