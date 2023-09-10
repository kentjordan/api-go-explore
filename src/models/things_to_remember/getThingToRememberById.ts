import { NextFunction } from "express";

const getThingToRememberById = async (thingToRemember_id: string, next: NextFunction) => {

    try {
        return await prismaClient.thingToRemember.findUniqueOrThrow({
            where: {
                id: thingToRemember_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getThingToRememberById;