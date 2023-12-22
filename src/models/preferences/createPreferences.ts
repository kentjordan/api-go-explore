import { NextFunction } from "express";
import { IPreferencesCreateInput } from "~/@types/modules/preferences";

async function hasAlreadyPreferences(user_id: string) {

    const preferecesCount = await prismaClient.preferences.count({
        select: { user_id: true },
        where: {
            user_id,
        }
    });

    return preferecesCount.user_id >= 1;

}

const createPreferences = async (input: IPreferencesCreateInput & { user_id: string }, next: NextFunction) => {
    try {
        if (await hasAlreadyPreferences(input.user_id)) {
            return {
                id: input.user_id,
                isLimitExceeded: true,
            }
        }

        const createdPreferences = await prismaClient.preferences.create({
            select: {
                id: true,
                created_at: true,
                user_id: true,
                preferenced_categories: true
            },
            data: {
                preferenced_categories: input.preferenced_categories?.map((e) => e.toLowerCase()),
                user_id: input.user_id
            }
        });

        return {
            ...createdPreferences
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default createPreferences;