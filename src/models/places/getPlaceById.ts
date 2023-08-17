import { NextFunction } from "express";

async function getPlaceById(id: string, next: NextFunction) {

    try {

        const place = await prismaClient.place.findFirstOrThrow({
            select: {
                category: true,
                title: true,
                description: true,
                photos: true,
                updated_at: true,
                _count: true
            },
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