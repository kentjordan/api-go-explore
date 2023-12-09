import { NextFunction } from "express";

const getPlaceFeedbacksByAggregation = async (place_id: string, next: NextFunction) => {

    try {
        const feedbacksByRatings = []

        for (let i = 1; i <= 5; i++) {
            const rating = await prismaClient.$queryRaw`
                            SELECT F.id, F.created_at, F.rating, F.comment, F.place_id, F.user_id, U.first_name, U.last_name, U.from_country, U.current_city, U.current_province, U.profile_photo, U.gender 
                            FROM "Feedback" AS F
                            JOIN "User" AS U
                            ON U.id = F.user_id
                            WHERE rating = ${i} AND place_id = ${place_id}::UUID
                            ORDER BY F.created_at DESC;
                            `;

            feedbacksByRatings.push(rating);
        }

        return feedbacksByRatings;
    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceFeedbacksByAggregation;