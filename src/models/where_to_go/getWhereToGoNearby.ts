import { NextFunction } from "express";

const getWhereToGoNearby = async (city: string, next: NextFunction) => {
    try {
        return await prismaClient.place.findMany({
            where: {
                city
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getWhereToGoNearby;