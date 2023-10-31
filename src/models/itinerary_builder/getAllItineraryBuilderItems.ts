import { NextFunction } from "express";

const getAllItineraryBuilderItems = async (user_id: string, next: NextFunction) => {

    try {
        return await prismaClient.itineraryBuilder.findMany({
            where: {
                user_id
            }
        });
    } catch (error) {
        next(error);
    }

}

export default getAllItineraryBuilderItems;