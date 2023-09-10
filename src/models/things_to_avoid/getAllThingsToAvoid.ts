import { NextFunction } from "express";

const getAllThingsToAvoid = async (next: NextFunction) => {
    try {
        return await prismaClient.thingToAvoid.findMany();
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllThingsToAvoid;