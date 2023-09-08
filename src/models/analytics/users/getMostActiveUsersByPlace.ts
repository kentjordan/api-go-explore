import { NextFunction } from "express";

interface IResponseMostActiveUserByPlace {
    city: string,
    users_count: number
}

const getMostActiveUserByPlace = async (next: NextFunction, limit: number) => {

    try {
        const mostActiveUsersByPlace = await prismaClient.$queryRaw <IResponseMostActiveUserByPlace[]>`
            SELECT current_city AS city, current_province AS province, COUNT(*) AS users_count
            FROM (SELECT lih.user_id, u.current_province, u.current_city, COUNT(*)
                FROM "LoggedInHistory" AS lih
                JOIN "User" as u
                ON lih.user_id = u.id
                GROUP BY lih.user_id, u.current_city, u.current_province) AS logged_in_user
            GROUP BY current_city, current_province
            ORDER BY users_count DESC
            LIMIT ${limit};
            `;

        return mostActiveUsersByPlace.map((e, i) => ({
            ...e,
            users_count: parseInt(`${e.users_count}`)
        }));

    } catch (error: unknown) {
        next(error);
    }

}

export default getMostActiveUserByPlace;