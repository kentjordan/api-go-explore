import { NextFunction } from "express";

const deleteThingToAvoidById = async (thingToAvoid_id: string, next: NextFunction) => {
    try {
        return await prismaClient.thingToAvoid.delete({
            where: {
                id: thingToAvoid_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteThingToAvoidById;