import { NextFunction } from "express";

interface IUserPreferencesRecommendation {
    title: string,
    category: string,
    created_at: string
}

type ICategoryRecommendation = {
    [key: string]: IUserPreferencesRecommendation
}

const recommendationByLatestAdded = async (user_id: string) => {

    const userPreferences = await prismaClient.preferences.findUniqueOrThrow({
        select: {
            preferenced_categories: true
        },
        where: {
            user_id
        }
    });

    const userPreferencesRecommendation = userPreferences.preferenced_categories.map<Promise<ICategoryRecommendation>>
        (async (e, i) => {
            return {
                [e]: await prismaClient.$queryRaw<IUserPreferencesRecommendation>`
                        SELECT id, title, category, province, city, created_at
                        FROM "Place"
                        WHERE category = ${e}
                        ORDER BY created_at DESC
                        LIMIT 10;`
            }
        });

    return await Promise.allSettled<ICategoryRecommendation>(userPreferencesRecommendation)

}


const recommendationByPopularity = async (user_id: string) => {

    const userPreferences = await prismaClient.preferences.findUniqueOrThrow({
        select: {
            preferenced_categories: true
        },
        where: {
            user_id
        }
    });

    // TODO: Refactor the SQL
    const awit = userPreferences.preferenced_categories.map(async (e, i) => {

        const mostVisitedPlacesByCategory = await prismaClient.$queryRaw < any[]> `
            SELECT place_id, p.category, p.title, p.province, p.city, COUNT(place_Id) as visited_count
            FROM "VisitedPlace" as vp JOIN "Place" as p ON vp.place_id = p.id
            WHERE p.category = ${e.toLowerCase()}
            GROUP BY vp.place_id, p.category, p.title, p.province, p.city
            ORDER BY visited_count DESC
            LIMIT 10;
        `;

        return mostVisitedPlacesByCategory.map((e, i) => ({
            ...e,
            visited_count: parseInt(`${e.visited_count}`)
        }));

    });

    return await Promise.allSettled(awit)

}

const getUserRecommendationByPreferences = async (user_id: string, next: NextFunction) => {
    try {

        const visited_count = await prismaClient.$queryRaw<{ count: number }[]>`
            SELECT COUNT(*)
            FROM (
                SELECT user_id
                FROM "VisitedPlace"
                GROUP BY user_id
            ) AS v;
        `

        if (visited_count.at(0)?.count as number >= 5) {
            // TODO: Refactor the SQL
            const r = await recommendationByPopularity(user_id);

            return r.map((e: any, i) => {
                return {
                    category: e.value.at(0).category,
                    ...e,
                }
            });
        }

        const r = await recommendationByLatestAdded(user_id);
        return r;

        // return r.map((e: any, i) => {
        //     return {
        //         category: e.value.at(0).category,
        //         ...e,
        //     }
        // });
    } catch (error: unknown) {
        next(error);
    }
}

export default getUserRecommendationByPreferences;