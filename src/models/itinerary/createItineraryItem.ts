import { NextFunction } from "express";
import { IItineraryCreateInput } from "~/@types/itinerary";

async function hasDuplicate(data: IItineraryCreateInput): Promise<boolean> {

    const places = await prismaClient.itinerary.count({
        select: { place_id: true },
        where: {
            user_id: data.user_id,
            place_id: data.place_id
        }
    });

    return places.place_id >= 1;
}

async function createItineraryItem(data: IItineraryCreateInput, next: NextFunction) {

    try {
        if (await hasDuplicate(data)) {
            return {
                hasDuplicate: true,
                id: data.place_id
            }
        }
        const item = await prismaClient.itinerary.create({
            select: { id: true },
            data
        });

        return {
            ...item
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default createItineraryItem;
