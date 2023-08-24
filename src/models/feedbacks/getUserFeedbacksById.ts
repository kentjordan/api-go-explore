import { NextFunction } from "express";

async function getUserFeedbacksById(user_id: string, next: NextFunction) {

    try {
        return await prismaClient.feedback.findMany({
            select: {
                comment: true,
                id: true,
                place_id: true,
                rating: true,
            },
            where: {
                user_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getUserFeedbacksById;