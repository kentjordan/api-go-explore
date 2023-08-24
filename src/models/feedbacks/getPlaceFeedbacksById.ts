import { NextFunction } from "express";

async function getPlaceFeedbacksById(place_id: string, next: NextFunction) {
    try {
        return await prismaClient.feedback.findMany({
            where: {
                place_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceFeedbacksById;