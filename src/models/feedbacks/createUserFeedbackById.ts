import { NextFunction } from "express";
import { IUserFeedbackCreateInput } from "~/@types/modules/feedbacks";

async function hasAlreadyFeedback(place_id: string, user_id: string) {

    const feedbackCount = await prismaClient.feedback.count({
        select: { user_id: true },
        where: {
            place_id,
            user_id,
        }
    });

    return feedbackCount.user_id >= 1;

}

async function createUserFeedbackById(data: IUserFeedbackCreateInput, id: string, next: NextFunction) {

    try {

        if (await hasAlreadyFeedback(data.place_id, id)) {

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