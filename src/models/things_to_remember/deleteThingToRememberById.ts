import { NextFunction } from "express";

const deleteThingToRememberById = async (thingToRemember_id: string, next: NextFunction) => {
    try {
        return await prismaClient.thingToRemember.delete({
            where: {
                id: thingToRemember_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteThingToRememberById;