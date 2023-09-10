import { NextFunction } from "express";

const getAllThingsToBring = async (next: NextFunction) => {
    try {
        return await prismaClient.thingToBring.findMany();
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllThingsToBring;