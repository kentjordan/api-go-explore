import { NextFunction } from "express";

async function deleteEvents(next: NextFunction) {

    try {

        const count = await prismaClient.$queryRaw<any>`SELECT COUNT(*) FROM "Event"`;

        await prismaClient.$queryRaw<any>`TRUNCATE "Event"`;

        return count[0]

    } catch (error: unknown) {
        next(error);
    }
}

export default deleteEvents;