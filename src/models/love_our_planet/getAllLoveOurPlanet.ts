import { NextFunction } from "express";

const getAllLoveOurPlanet = async (next: NextFunction) => {

    try {
        return await prismaClient.loveOurPlanet.findMany();
    } catch (error: unknown) {
        next(error);
    }

}

export default getAllLoveOurPlanet;