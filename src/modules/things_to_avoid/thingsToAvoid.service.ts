import { NextFunction, Request, Response } from "express"
import { IThingToAvoidCreateInput, IThingToAvoidIDInput } from "~/@types/modules/things_to_avoid";
import { IRequestCustomParams } from "~/@types/request";
import * as ThingToAvoidModels from '~/models/things_to_avoid'
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createThingToAvoid = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToAvoidCreateInput>(req);

    const createdThingToAvoid = await ThingToAvoidModels.createThingToAvoid(input, next);

    if (createdThingToAvoid) {
        res.status(200).json({
            ...createdThingToAvoid
        });
    }
}

const getAllThingsToAvoid = async (req: Request, res: Response, next: NextFunction) => {

    const thingsToAvoid = await ThingToAvoidModels.getAllThingsToAvoid(next);

    if (thingsToAvoid) {
        res.status(200).json([...thingsToAvoid]);
    }

}

const getThingToAvoidById = async (req: IRequestCustomParams<IThingToAvoidIDInput>, res: Response, next: NextFunction) => {

    const { thingsToAvoid_id } = ExtractReqParams<IThingToAvoidIDInput>(req);
    const thingToAvoid = await ThingToAvoidModels.getThingToAvoidById(thingsToAvoid_id, next);

    if (thingToAvoid) {
        res.status(200).json({
            ...thingToAvoid
        });
    }

}

const updateThingToAvoidById = async (req: IRequestCustomParams<IThingToAvoidIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IThingToAvoidCreateInput>(req);
    const { thingsToAvoid_id } = ExtractReqParams<IThingToAvoidIDInput>(req);

    const updatedThingToAvoid = await ThingToAvoidModels.updateThingToAvoidById({ thingsToAvoid_id, ...input }, next);

    if (updatedThingToAvoid) {
        res.status(200).json({
            ...updatedThingToAvoid
        });
    }
}

const deleteThingToAvoidById = async (req: IRequestCustomParams<IThingToAvoidIDInput>, res: Response, next: NextFunction) => {

    const { thingsToAvoid_id } = ExtractReqParams<IThingToAvoidIDInput>(req);
    const deletedThingToAvoid = await ThingToAvoidModels.deleteThingToAvoidById(thingsToAvoid_id, next);

    if (deletedThingToAvoid) {
        res.status(200).json({
            ...deletedThingToAvoid
        });
    }
}

export {
    createThingToAvoid,
    getAllThingsToAvoid,
    getThingToAvoidById,
    updateThingToAvoidById,
    deleteThingToAvoidById
}