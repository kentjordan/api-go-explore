import { NextFunction } from "express";
import { IEventUpdateInput } from "~/@types/events";

async function updateEventById(data: IEventUpdateInput, id: string, next: NextFunction) {

    try {
        const event = await prismaClient.event.update({
            data: {
                ...data,
                updated_at: new Date().toISOString()
            },
            where: { id }
        });

        return {
            ...event
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default updateEventById;