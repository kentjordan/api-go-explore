import { NextFunction } from "express";

const visitPlaceByUserAnon = async (place_id: string, next: NextFunction) => {
    try {
        return await prismaClient.visitedPlace.create({
            select: {
                place_id: true
            },
            data: {
                place_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default visitPlaceByUserAnon;