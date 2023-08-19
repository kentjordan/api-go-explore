import { NextFunction } from "express";

async function getItemByUserId(id: string, next: NextFunction) {

    try {

        const item = await prismaClient.itinerary.findFirstOrThrow({
            select: {
                id: true,
                place_id: true,
                user_id: true,
                updated_at: true
            },
            where: { id }
        });

        return {
            ...item
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default getItemByUserId;