import { NextFunction } from "express";
import { IThingToBringCreateInput } from "~/@types/modules/things_to_bring";

const createFooter = async (input: IThingToBringCreateInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToBring.create({
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

export default createFooter;