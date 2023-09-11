import { NextFunction } from "express";
import { ILoveOurPlanetUpdateInput, ILoveOurPlanetIDInput } from "~/@types/modules/love_our_planet";

const updateLoveOurPlanetById = async (input: ILoveOurPlanetUpdateInput & ILoveOurPlanetIDInput, next: NextFunction) => {

    try {
        return await prismaClient.loveOurPlanet.update({
            data: {
                updated_at: new Date().toISOString(),
                title: input.title
            },
            where: {
                id: input.loveOurPlanet_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default updateLoveOurPlanetById;