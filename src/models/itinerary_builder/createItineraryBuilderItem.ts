import { NextFunction } from "express";
import { IItineraryBuilderItemCreateInput } from "~/@types/modules/itinerary_builder";

const createItineraryBuilderItem = async (user_id: string, data: IItineraryBuilderItemCreateInput, next: NextFunction) => {

    try {
        return prismaClient.itineraryBuilder.create({
            data: {
                ...data,
                user_id
            },
        });
    } catch (error) {
        next(error);
    }

}

export default createItineraryBuilderItem;