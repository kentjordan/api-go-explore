import { NextFunction } from "express";

async function deleteUserById(id: string, next: NextFunction) {

    try {

        await prismaClient.itineraryBuilder.deleteMany({
            where: { user_id: id }
        });

        await prismaClient.itinerary.deleteMany({
            where: { user_id: id }
        });

        await prismaClient.visitedPlace.deleteMany({
            where: { user_id: id }
        });

        // Delete 
        await prismaClient.$queryRaw`
        DELETE FROM 
            "ReplyComment"
        WHERE feedback_id IN 
                        (SELECT id
                        FROM "Feedback"
                        WHERE user_id = ${id}::UUID);
        `;

        await prismaClient.replyComment.deleteMany({
            where: {
                user_id: id
            }
        });

        await prismaClient.feedback.deleteMany({
            where: { user_id: id }
        });

        await prismaClient.loggedInHistory.deleteMany({
            where: { user_id: id }
        });

        await prismaClient.preferences.deleteMany({
            where: { user_id: id }
        });

        const user = await prismaClient.user.delete({
            select: { id: true },
            where: { id }
        });

        return {
            ...user
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteUserById;