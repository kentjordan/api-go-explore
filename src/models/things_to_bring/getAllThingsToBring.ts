import { NextFunction } from "express";

const getAllFooter = async (next: NextFunction) => {
    try {
        return await prismaClient.thingToBring.findMany();
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllFooter;