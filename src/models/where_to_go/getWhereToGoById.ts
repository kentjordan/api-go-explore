import { NextFunction } from "express";

const getWhereToGoById = async (whereToGo_id: string, next: NextFunction) => {
    try {
        return await prismaClient.whereToGo.findUniqueOrThrow({
            where: {
                id: whereToGo_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getWhereToGoById;