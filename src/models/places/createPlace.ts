import { NextFunction } from "express";
import { IPlaceCreateInput } from "~/@types/places";

async function createPlace(data: IPlaceCreateInput, next: NextFunction) {

    try {

        const place = await prismaClient.place.create({
            select: { id: true },
            data: {
                ...data,
                category: data.category.toLowerCase(),
                created_at: new Date().toISOString(),
            }
        });

        return {
            ...place,
            type: "CREATE"
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default createPlace;