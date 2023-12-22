import { NextFunction } from "express";

interface ICreateFeedbackReplyDto {
    reply_comment: string | null,
    user_id: string,
    feedback_id: string
}

const createFeedbackReply = async (bodyDto: ICreateFeedbackReplyDto, next: NextFunction) => {
    try {
        return await prismaClient.replyComment.create({
            select: {
                reply_comment: true,
                user_id: true,
                feedback_id: true
            },
            data: {
                ...bodyDto
            }
        });
    } catch (error) {
        next()
    }


}

export default createFeedbackReply;