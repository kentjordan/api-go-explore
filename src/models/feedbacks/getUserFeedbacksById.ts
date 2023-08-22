import { NextFunction } from "express";

async function getUserFeedbacksById(id: string, next: NextFunction) {
    try {
        return await prismaClient.feedback.findMany({
            where: { user_id: id }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getUserFeedbacksById;