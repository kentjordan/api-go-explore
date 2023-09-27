import { NextFunction } from "express";

async function deletePlaceById(id: string, next: NextFunction) {

    try {

        await prismaClient.feedback.deleteMany({
            where: { place_id: id },
        });

        await prismaClient.itinerary.deleteMany({
            where: { place_id: id },
        });

        await prismaClient.visitedPlace.deleteMany({
            where: { place_id: id },
        });

        const place = await prismaClient.place.delete({
            select: { id: true },
            where: { id },
        });

        return {
            ...place,
            type: 'DELETE',
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default deletePlaceById;