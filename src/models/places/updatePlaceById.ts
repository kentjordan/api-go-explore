import { NextFunction } from "express";
import { IPlaceUpdateInput } from "~/@types/places";

async function updatePlaceById(id: string, data: IPlaceUpdateInput, next: NextFunction) {

    try {

        const place = await prismaClient.place.update({
            select: { id: true },
            where: { id },
            data: {
                ...data,
                category: data.category?.toLowerCase(),
                updated_at: new Date().toISOString()
            }
        });

        return {
            ...place,
            type: 'UPDATE',
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default updatePlaceById;