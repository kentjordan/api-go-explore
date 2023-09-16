import { NextFunction } from "express";

const getPlaceFeedbacksByAggregation = async (place_id: string, next: NextFunction) => {

    try {
        const feedbacksByRatings = []

        for (let i = 1; i <= 5; i++) {
            const rating = await prismaClient.$queryRaw`
                            SELECT *
                            FROM "Feedback"
                            WHERE rating = ${i} AND place_id = ${place_id}::UUID
                            ORDER BY created_at DESC;
                            `;

            feedbacksByRatings.push(rating);
        }

        return feedbacksByRatings;
    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceFeedbacksByAggregation;