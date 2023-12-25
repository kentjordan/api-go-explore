import { NextFunction } from "express";
import getUserVisitedHistory from "./getUserVisitedHistory";
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

    const userVisitedHistory = await getUserVisitedHistory(user_id);

    const recommendationsByLatestAdded = userVisitedHistory.map<Promise<ICategoryRecommendation>>
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

    const userVisitedHistory = await getUserVisitedHistory(user_id);

    const recommendationsByPopularity = userVisitedHistory.map(async (category, i) => {

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

    return response.map((e, i) => {
        return {
            ...e.value
        }
    });

}

export type IUserRecommendationByItsHistory = Array<{
    id: string,
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    visited_count: number
}>

const mostVisitedPlaces = async (user_id: string) => {
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
        `;
}

// Most RATED place based on user "history"
const mostRatedPlaces = async (user_id: string) => {
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
                            WHERE user_id = 'ce91a506-b43d-4631-bb28-46b50381698d') AS user_hist
                        ON
                            P.id = user_hist.place_id)
                ORDER BY avg_rating DESC
                LIMIT 10`;
}

// Most visited place based on user "history"
const getUserRecommendationByHistory = async (type: "most-visited" | "most-rated", user_id: string, next: NextFunction) => {

    try {
        if (type === 'most-visited') {
            return await mostVisitedPlaces(user_id);
        }

        if (type === 'most-rated') {
            return await mostRatedPlaces(user_id);
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getUserRecommendationByHistory;