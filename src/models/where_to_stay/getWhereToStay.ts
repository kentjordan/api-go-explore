import { NextFunction } from "express";

const getWhereToStay = async (city: string = '', limit: number = 5, next: NextFunction) => {

    try {
        return await prismaClient.place.findMany({
            where: {
                city
            },
            take: limit
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getWhereToStay;