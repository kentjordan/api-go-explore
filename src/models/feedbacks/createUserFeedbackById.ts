import { NextFunction } from "express";
import { IUserFeedbackByIdCreateInput } from "~/@types/modules/feedbacks";

async function hasAlreadyFeedback(id: string) {

    const feedbackCount = await prismaClient.feedback.count({
        select: { user_id: true },
        where: { user_id: id }
    });

    return feedbackCount.user_id >= 1;

}

async function createUserFeedbackById(data: IUserFeedbackByIdCreateInput, id: string, next: NextFunction) {

    try {

        if (await hasAlreadyFeedback(id)) {

            return {
                message: 'Can\'t create more than 1 feedback.',
                type: 'LIMIT_EXCEEDED',
            }

        }

        const feedback = await prismaClient.feedback.create({
            select: { id: true },
            data: {
                ...data,
                user_id: id
            }
        });

        return {
            ...feedback,
            message: 'Feedback has been successfully created.',
            type: 'CREATE',
        }


    } catch (error: unknown) {
        next(error);
    }

}

export default createUserFeedbackById;