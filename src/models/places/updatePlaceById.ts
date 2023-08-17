import { NextFunction } from "express";
import { IPlaceUpdateInput } from "~/@types/places";

async function updatePlaceById(id: string, data: IPlaceUpdateInput, next: NextFunction) {

    try {

        const updatedPlaceId = await prismaClient.place.update({
            select: { id: true },
            where: { id },
            data
        });

        return {
            updatedPlaceId
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default updatePlaceById;