import { NextFunction } from "express";

async function getEvents(next: NextFunction) {
    try {
        return await prismaClient.event.findMany(
            {
                select: {
                    id: true,
                    created_at: true,
                    updated_at: true,
                    date: true,
                    title: true,
                    description: true,
                    province: true,
                    city: true,
                    barangay: true,
                    images: true
                }
            }
        );
    } catch (error: unknown) {
        next(error);
    }
}

export default getEvents;