import { NextFunction } from "express";
import { IUserFeedbackUpdateInput } from '~/@types/modules/feedbacks'

async function updateUserFeedbackById(user_id: string, data: IUserFeedbackUpdateInput, next: NextFunction) {
    try {

        const { feedback_id, comment, rating } = data;

        return await prismaClient.feedback.update({
            select: {
                user_id: true,
                id: true,
            },
            data: {
                comment,
                rating
            },
            where: {
                user_id,
                id: feedback_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateUserFeedbackById;