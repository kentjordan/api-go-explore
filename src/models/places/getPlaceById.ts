import { NextFunction } from "express";

async function getPlaceById(id: string, next: NextFunction) {

    try {

        const place = await prismaClient.place.findFirstOrThrow({
            select: {
                id: true,
                created_at: true,
                updated_at: true,
                category: true,
                title: true,
                description: true,
                photos: true,
                contact: true,
                social_links: true,
                province: true,
                city: true,
                barangay: true
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