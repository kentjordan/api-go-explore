import { NextFunction } from "express";

const getAllFeedbacks = async (next: NextFunction) => {
    try {
        return await prismaClient.feedback.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getAllFeedbacks;``