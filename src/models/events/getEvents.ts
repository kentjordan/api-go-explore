import { NextFunction } from "express";

async function getEvents(next: NextFunction) {
    try {
        return await prismaClient.event.findMany(
            {
                select: {
                    id: true,
                    updated_at: true,
                    title: true,
                    description: true,
                    province: true,
                    city: true,
                    barangay: true,
                    image: true
                }
            }
        );
    } catch (error: unknown) {
        next(error);
    }
}

export default getEvents;