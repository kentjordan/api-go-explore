import { NextFunction } from "express";

const getLoveOurPlanetById = async (loveOurPlanet_id: string, next: NextFunction) => {

    try {
        return await prismaClient.loveOurPlanet.findUniqueOrThrow({
            where: {
                id: loveOurPlanet_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }

}

export default getLoveOurPlanetById;