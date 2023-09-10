import { NextFunction } from "express";

const getAllThingsToRemember = async (next: NextFunction) => {
    try {
        return await prismaClient.thingToRemember.findMany();
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllThingsToRemember;