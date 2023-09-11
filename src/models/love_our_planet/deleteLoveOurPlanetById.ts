import { NextFunction } from "express";

const deleteLoveOurPlanetById = async (loveOurPlanet_id: string, next: NextFunction) => {

    try {
        return await prismaClient.loveOurPlanet.delete({
            where: {
                id: loveOurPlanet_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }

}

export default deleteLoveOurPlanetById;