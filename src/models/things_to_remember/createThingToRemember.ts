import { NextFunction } from "express";
import { IThingToRememberCreateInput } from "~/@types/modules/things_to_remember";

const createThingToRemember = async (input: IThingToRememberCreateInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToRemember.create({
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

export default createThingToRemember;