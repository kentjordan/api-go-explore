import { NextFunction } from "express";
import { IUserCountOverall } from "~/@types/modules/analytics";

const getOverallUsersCount = async (next: NextFunction) => {

    try {
        const [overallUsersCount] = await prismaClient.$queryRaw <IUserCountOverall[]>
            `
            SELECT COUNT(u.gender) AS users_count
            FROM "User" as u;
            `;

        return {
            users_count: parseInt(`${overallUsersCount.users_count}`)
        }
    } catch (error: unknown) {
        next(error);
    }
}

export default getOverallUsersCount;