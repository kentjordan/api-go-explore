import { NextFunction, Request, Response } from "express"
import { ILoveOurPlanetCreateInput, ILoveOurPlanetIDInput, ILoveOurPlanetUpdateInput } from "~/@types/modules/love_our_planet";
import { IRequestCustomParams } from "~/@types/request";
import * as LoveOurPlanetModels from '~/models/love_our_planet';
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createLoveOurPlanet = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<ILoveOurPlanetCreateInput>(req);

    const createdLoveOurPlanet = await LoveOurPlanetModels.createLoveOurPlanet(input, next);

    if (createdLoveOurPlanet) {
        res.status(200).json({
            ...createdLoveOurPlanet
        });
    }

}

const getLoveOurPlanetById = async (req: IRequestCustomParams<ILoveOurPlanetIDInput>, res: Response, next: NextFunction) => {

    const { loveOurPlanet_id } = ExtractReqParams<ILoveOurPlanetIDInput>(req);

    const loveOurPlanet = await LoveOurPlanetModels.getLoveOurPlanetById(loveOurPlanet_id, next);

    if (loveOurPlanet) {
        res.status(200).json({
            ...loveOurPlanet
        });
    }

}

const getAllLoveOurPlanet = async (req: Request, res: Response, next: NextFunction) => {

    const loveOurPlanet = await LoveOurPlanetModels.getAllLoveOurPlanet(next);

    if (loveOurPlanet) {
        res.status(200).json([...loveOurPlanet]);
    }

}

const updateLoveOurPlanet = async (req: IRequestCustomParams<ILoveOurPlanetIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<ILoveOurPlanetUpdateInput>(req);
    const { loveOurPlanet_id } = ExtractReqParams<ILoveOurPlanetIDInput>(req);

    const updatedLoveOurPlanet = await LoveOurPlanetModels.updateLoveOurPlanetById({ ...input, loveOurPlanet_id }, next);

    if (updatedLoveOurPlanet) {
        res.status(200).json({
            ...updatedLoveOurPlanet
        });
    }

}

const deleteLoveOurPlanetById = async (req: IRequestCustomParams<ILoveOurPlanetIDInput>, res: Response, next: NextFunction) => {

    const { loveOurPlanet_id } = ExtractReqParams<ILoveOurPlanetIDInput>(req);

    const deletedLoveOurPlanet = await LoveOurPlanetModels.deleteLoveOurPlanetById(loveOurPlanet_id, next);

    if (deletedLoveOurPlanet) {
        res.status(200).json({
            ...deletedLoveOurPlanet
        });
    }

}

export {
    createLoveOurPlanet,
    getLoveOurPlanetById,
    getAllLoveOurPlanet,
    updateLoveOurPlanet,
    deleteLoveOurPlanetById
}