import { NextFunction } from "express";

const getFooterById = async (thingToBring_id: string, next: NextFunction) => {

    try {
        return await prismaClient.thingToBring.findUniqueOrThrow({
            where: {
                id: thingToBring_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getFooterById;