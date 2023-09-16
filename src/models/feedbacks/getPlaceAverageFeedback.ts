import { NextFunction } from "express";

const getPlaceAverageFeedback = async (place_id: string, next: NextFunction) => {
    try {
        const [{ avg }] = await prismaClient.$queryRaw<{ avg: number }[]>`
            SELECT AVG(rating)
            FROM "Feedback"
            WHERE place_id = ${place_id}::UUID
        `;

        return avg;
    } catch (error: unknown) {
        next(error);
    }
}

export default getPlaceAverageFeedback;