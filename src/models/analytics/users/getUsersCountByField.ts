import { NextFunction } from "express";
import { IUserCountByGender, IUserCountOverall } from "~/@types/modules/analytics";

const getUsersCountByField = async (field: string, next: NextFunction) => {

    try {
        switch (field) {
            case "gender":
                const usersCountByGender = await prismaClient.$queryRaw <{
                    gender: number,
                    count: number
                }[]>`
                SELECT u.gender, COUNT(u.gender)
                FROM "User" as u
                GROUP BY u.gender;
                `;

                const response: IUserCountByGender = {
                    male: 0,
                    female: 0
                }

                for (const i of usersCountByGender) {
                    if (i.gender === 0) {
                        response.male = parseInt(`${i.count}`);
                    } else {
                        response.female = parseInt(`${i.count}`);
                    }
                }

                return response;

            default:
                const [overallUsersCount] = await prismaClient.$queryRaw <IUserCountOverall[]>
                    `
                    SELECT COUNT(u.gender) AS users_count
                    FROM "User" as u;
                `;

                return {
                    users_count: parseInt(`${overallUsersCount.users_count}`)
                }
        }
    } catch (error: unknown) {
        next(error);
    }

}

export default getUsersCountByField;