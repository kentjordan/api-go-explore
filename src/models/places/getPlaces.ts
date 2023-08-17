import { NextFunction } from "express";

async function getPlaces(next: NextFunction) {

    try {
        return await prismaClient.place.findMany();
    } catch (error: unknown) {
        next(error);
    }

}

export default getPlaces;