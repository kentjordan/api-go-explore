import { NextFunction } from "express";
import getUserPreferences from "./getUserPreferences";
import getVisitedPlacesCount from "../getVisitedPlacesCount";

type RecommendationByPopularity = Array<{
    status: string,
    value: {
        category: string,
        data: Array<any>
    }
}>;

interface IUserPreferencesRecommendation {
    title: string,
    category: string,
    created_at: string
}

type ICategoryRecommendation = {
    category: string,
    data: IUserPreferencesRecommendation
}

const recommendationByLatestAdded = async (user_id: string) => {

    const userPreferences = await getUserPreferences(user_id);

    const recommendationsByLatestAdded = userPreferences.map<Promise<ICategoryRecommendation>>
        (async (e, i) => {
            return {
                category: e,
                data: await prismaClient.$queryRaw<IUserPreferencesRecommendation>`
                        SELECT id AS place_id, category, title, province, city, barangay, category, created_at
                        FROM "Place"
                        WHERE category = ${e}
                        ORDER BY created_at DESC
                        LIMIT 10;`
            }
        });

    const response = (await Promise.allSettled<ICategoryRecommendation>(recommendationsByLatestAdded)) as any;

    return (response).map((e: any, i: number) => ({
        ...e.value
    }));

}


const recommendationByPopularity = async (user_id: string) => {

    const userPreferences = await getUserPreferences(user_id);

    const recommendationsByPopularity = userPreferences.map(async (category, i) => {

        const popularPlaces = await prismaClient.$queryRaw <any[]> `
            SELECT vp.place_Id AS place_id, p.category, p.title, p.province, p.city, p.barangay, p.created_at, COUNT(vp.place_Id) AS visited_count
            FROM "VisitedPlace" as vp
            JOIN "Place" as p ON vp.place_id = p.id
            WHERE p.category = ${category}
            GROUP BY vp.place_Id, p.title, p.province, p.city, p.barangay, p.category, p.created_at 
            ORDER BY visited_count DESC
            LIMIT 10;
        `;

        const data = popularPlaces.map((e, i) => ({
            ...e,
            visited_count: parseInt(`${e.visited_count}`)
        }));

        return { category, data };
    });

    const response = await Promise.allSettled(recommendationsByPopularity) as RecommendationByPopularity;

    return response.map((e, i) => ({
        ...e.value
    }));
}

type IUserRecommendationByItsPreferences = Array<{
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    visited_count: number
}>

const getUserRecommendationByPreferences = async (user_id: string, next: NextFunction) => {

    try {

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
                LIMIT 10;
        `;

    } catch (error: unknown) {
        next(error);
    }
}

export default getUserRecommendationByPreferences;