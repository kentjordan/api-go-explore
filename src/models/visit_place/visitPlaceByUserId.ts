import { NextFunction } from "express"

interface IData {
    place_id: string,
    user_id: string
}

const visitPlaceByUserId = async (data: IData, next: NextFunction) => {
    try {
        return await prismaClient.visitedPlace.create({
            select: {
                place_id: true,
                user_id: true,
            },
            data: {
                place_id: data.place_id,
                user_id: data.user_id,
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default visitPlaceByUserId;