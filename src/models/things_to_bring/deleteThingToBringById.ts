import { NextFunction } from "express";

const deleteFooterById = async (thingToBring_id: string, next: NextFunction) => {
    try {
        return await prismaClient.thingToBring.delete({
            where: {
                id: thingToBring_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteFooterById;