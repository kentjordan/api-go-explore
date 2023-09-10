import { NextFunction } from "express";
import { IThingToAvoidCreateInput } from "~/@types/modules/things_to_avoid";

const createThingToAvoid = async (input: IThingToAvoidCreateInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToAvoid.create({
            select: {
                id: true,
                created_at: true,
                description: true
            },
            data: input
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default createThingToAvoid;