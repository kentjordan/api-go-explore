import { NextFunction } from "express";

const getAllItinerary = async (next: NextFunction) => {
    try {
        return await prismaClient.itinerary.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllItinerary;