import { NextFunction, Request, Response } from "express"
import { IThingToBringCreateInput, IThingToBringIDInput } from "~/@types/modules/things_to_bring";
import { IRequestCustomParams } from "~/@types/request";
import * as ThingToBringModels from '~/models/things_to_bring'
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createThingToBring = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToBringCreateInput>(req);

    const createdThingToBring = await ThingToBringModels.createThingToBring(input, next);

    if (createdThingToBring) {
        res.status(200).json({
            ...createdThingToBring
        });
    }
}

const getAllThingsToBring = async (req: Request, res: Response, next: NextFunction) => {

    const thingsToBring = await ThingToBringModels.getAllThingsToBring(next);

    if (thingsToBring) {
        res.status(200).json([...thingsToBring]);
    }

}

const getThingToBringById = async (req: IRequestCustomParams<IThingToBringIDInput>, res: Response, next: NextFunction) => {

    const { thingsToBring_id } = ExtractReqParams<IThingToBringIDInput>(req);
    const thingToBring = await ThingToBringModels.getThingToBringById(thingsToBring_id, next);

    if (thingToBring) {
        res.status(200).json({
            ...thingToBring
        });
    }

}

const updateThingToBringById = async (req: IRequestCustomParams<IThingToBringIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToBringCreateInput>(req);
    const { thingsToBring_id } = ExtractReqParams<IThingToBringIDInput>(req);

    const updatedThingToBring = await ThingToBringModels.updateThingToBringById({ thingsToBring_id, ...input }, next);

    if (updatedThingToBring) {
        res.status(200).json({
            ...updatedThingToBring
        });
    }
}

const deleteThingToBringById = async (req: IRequestCustomParams<IThingToBringIDInput>, res: Response, next: NextFunction) => {

    const { thingsToBring_id } = ExtractReqParams<IThingToBringIDInput>(req);
    const deletedThingToBring = await ThingToBringModels.deleteThingToBringById(thingsToBring_id, next);

    if (deletedThingToBring) {
        res.status(200).json({
            ...deletedThingToBring
        });
    }
}

export {
    createThingToBring,
    getAllThingsToBring,
    getThingToBringById,
    updateThingToBringById,
    deleteThingToBringById
}