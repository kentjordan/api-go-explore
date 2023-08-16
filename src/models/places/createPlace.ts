import { NextFunction } from "express";
import { IPlaceCreateInput } from "~/@types/places";

async function createPlace(data: IPlaceCreateInput, next: NextFunction) {

    try {

        const db_res = await prismaClient.place.create({
            select: { id: true },
            data: {
                ...data,
                created_at: new Date().toISOString(),
            }
        });

        return {
            ...db_res,
            isPlaceCreated: true
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default createPlace;