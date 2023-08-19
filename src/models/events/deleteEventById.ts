import { NextFunction } from "express";

async function deleteEventById(id: string, next: NextFunction) {

    try {

        const event = await prismaClient.event.delete({
            select: { id: true },
            where: { id }
        });

        return {
            ...event
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteEventById;