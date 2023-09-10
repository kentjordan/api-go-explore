import { NextFunction } from "express";

const getThingToAvoidById = async (thingToAvoid_id: string, next: NextFunction) => {

    try {
        return await prismaClient.thingToAvoid.findUniqueOrThrow({
            where: {
                id: thingToAvoid_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getThingToAvoidById;