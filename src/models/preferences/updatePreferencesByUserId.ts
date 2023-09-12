import { NextFunction } from "express";
import { IPreferencesIDInput, IPreferencesUpdateInput } from "~/@types/modules/preferences";

const updatePreferencesByUserId = async (input: IPreferencesUpdateInput & IPreferencesIDInput & { user_id: string }, next: NextFunction) => {
    try {
        return await prismaClient.preferences.update({
            data: {
                updated_at: new Date().toISOString(),
                preferenced_categories: input.preferenced_categories
            },
            where: {
                id: input.preferences_id,
                user_id: input.user_id,
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default updatePreferencesByUserId;