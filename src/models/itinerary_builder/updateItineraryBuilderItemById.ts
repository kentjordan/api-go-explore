import { NextFunction } from "express";
import { IItineraryBuilderItemUpdateInput } from "~/@types/modules/itinerary_builder";

const updateItineraryBuilderItemById = async (item_id: string, user_id: string, data: IItineraryBuilderItemUpdateInput, next: NextFunction) => {

    try {
        return prismaClient.itineraryBuilder.update({
            where: {
                id: item_id,
                user_id
            },
            data: {
                ...data,
                updated_at: new Date().toISOString()
            },
        });
    } catch (error) {
        next(error);
    }

}

export default updateItineraryBuilderItemById;