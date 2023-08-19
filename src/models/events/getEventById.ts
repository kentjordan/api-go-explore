import { NextFunction } from "express";

async function getEventById(id: string, next: NextFunction) {

    try {
        return await prismaClient.event.findFirstOrThrow({
            select: {
                id: true,
                updated_at: true,
                title: true,
                description: true,
                province: true,
                city: true,
                barangay: true,
                images: true
            },
            where: { id }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default getEventById;