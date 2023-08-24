import { NextFunction } from "express";

async function deleteUserFeedbackById(user: Express.User, feedback_id: string, next: NextFunction) {
    try {
        await prismaClient.feedback.delete({
            where: {
                id: feedback_id,
                user_id: user.id,
            }
        });

        return {
            feedback_id,
            user_id: user.id
        }
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteUserFeedbackById;