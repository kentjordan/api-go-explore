import { NextFunction } from "express";

const getAllWhereToGo = async (next: NextFunction) => {
    try {
        return await prismaClient.whereToGo.findMany();
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllWhereToGo;