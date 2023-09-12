import { NextFunction } from "express";

const deletePreferencesByUserId = async (preferences_id: string, next: NextFunction) => {
    try {
        return await prismaClient.preferences.delete({
            where: {
                id: preferences_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default deletePreferencesByUserId;