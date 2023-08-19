import { NextFunction } from "express";
import { IEventCreateInput } from "~/@types/events";

async function createEvent(data: IEventCreateInput, next: NextFunction) {

    try {
        const event = await prismaClient.event.create({
            select: { id: true },
            data
        });

        return {
            ...event
        }

    } catch (error) {
        next(error);
    }
}

export default createEvent;