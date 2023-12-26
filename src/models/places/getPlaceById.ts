import { NextFunction } from "express";

async function getPlaceById(id: string, next: NextFunction) {

    try {

        const place = await prismaClient.place.findFirstOrThrow({
            where: { id }
        });

        return {
            ...place
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceById;