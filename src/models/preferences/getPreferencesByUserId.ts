import { NextFunction } from "express";

const getPreferencesByUserId = async (user_id: string, next: NextFunction) => {

    try {
        return await prismaClient.preferences.findUniqueOrThrow({
            where: {
                user_id: user_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getPreferencesByUserId;