import { NextFunction } from "express";

async function deletePlaceById(id: string, next: NextFunction) {

    try {
        const place = await prismaClient.place.delete({
            select: { id: true },
            where: { id },
        });

        return {
            ...place,
            type: 'DELETE',
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default deletePlaceById;