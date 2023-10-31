import { NextFunction } from "express";

const deleteItineraryBuilderItemById = async (item_id: string, next: NextFunction) => {
    try {
        return await prismaClient.itineraryBuilder.delete({
            where: {
                id: item_id
            }
        });
    } catch (error) {
        next(error);
    }
}

export default deleteItineraryBuilderItemById;