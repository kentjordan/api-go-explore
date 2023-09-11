import { NextFunction } from "express";
import { ILoveOurPlanetCreateInput } from "~/@types/modules/love_our_planet";

const createLoveOurPlanet = async (input: ILoveOurPlanetCreateInput, next: NextFunction) => {

    try {
        return await prismaClient.loveOurPlanet.create({
            data: input
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default createLoveOurPlanet;