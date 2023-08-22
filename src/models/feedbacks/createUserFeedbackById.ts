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
                isLimitExceeded: true,
                id: data.place_id
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
            ...feedback
        }


    } catch (error: unknown) {
        next(error);
    }

}

export default createUserFeedbackById;