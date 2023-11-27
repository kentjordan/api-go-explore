import { NextFunction } from "express";

async function getPlaceFeedbacksById(place_id: string, next: NextFunction) {
    try {
        return await prismaClient.$queryRaw < any[]> `
            SELECT F.id, F.created_at, F.rating, F.comment, F.place_id, F.user_id, U.first_name, U.last_name, U.from_country, U.current_city, U.current_province, U.profile_photo
            FROM "Feedback" AS F
            JOIN "User" AS U
            ON U.id = F.user_id
            WHERE place_id = ${place_id}::UUID
            ORDER BY F.created_at DESC;
        `

    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceFeedbacksById;