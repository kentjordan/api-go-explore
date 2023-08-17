import { NextFunction } from "express";

async function deletePlaceById(id: string, next: NextFunction) {

    try {
        const deletedPlace = await prismaClient.place.delete({
            where: { id },
        });

        return {
            ...deletedPlace,
            isDeleted: true,
        }

    } catch (error: unknown) {
        next(error);
    }

}

export default deletePlaceById;