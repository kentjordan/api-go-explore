import { NextFunction, Request, Response } from "express"
import { IThingToRememberCreateInput, IThingToRememberIDInput } from "~/@types/modules/things_to_remember";
import { IRequestCustomParams } from "~/@types/request";
import * as ThingToRememberModels from '~/models/things_to_remember'
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createThingToRemember = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToRememberCreateInput>(req);

    const createdThingToRemember = await ThingToRememberModels.createThingToRemember(input, next);

    if (createdThingToRemember) {
        res.status(200).json({
            ...createdThingToRemember
        });
    }
}

const getAllThingsToRemember = async (req: Request, res: Response, next: NextFunction) => {

    const thingsToRemember = await ThingToRememberModels.getAllThingsToRemember(next);

    if (thingsToRemember) {
        res.status(200).json([...thingsToRemember]);
    }

}

const getThingToRememberById = async (req: IRequestCustomParams<IThingToRememberIDInput>, res: Response, next: NextFunction) => {

    const { thingsToRemember_id } = ExtractReqParams<IThingToRememberIDInput>(req);
    const thingToRemember = await ThingToRememberModels.getThingToRememberById(thingsToRemember_id, next);

    if (thingToRemember) {
        res.status(200).json({
            ...thingToRemember
        });
    }

}

const updateThingToRememberById = async (req: IRequestCustomParams<IThingToRememberIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToRememberCreateInput>(req);
    const { thingsToRemember_id } = ExtractReqParams<IThingToRememberIDInput>(req);

    const updatedThingToRemember = await ThingToRememberModels.updateThingToRememberById({ thingsToRemember_id, ...input }, next);

    if (updatedThingToRemember) {
        res.status(200).json({
            ...updatedThingToRemember
        });
    }
}

const deleteThingToRememberById = async (req: IRequestCustomParams<IThingToRememberIDInput>, res: Response, next: NextFunction) => {

    const { thingsToRemember_id } = ExtractReqParams<IThingToRememberIDInput>(req);
    const deletedThingToRemember = await ThingToRememberModels.deleteThingToRememberById(thingsToRemember_id, next);

    if (deletedThingToRemember) {
        res.status(200).json({
            ...deletedThingToRemember
        });
    }
}

export {
    createThingToRemember,
    getAllThingsToRemember,
    getThingToRememberById,
    updateThingToRememberById,
    deleteThingToRememberById
}