import { NextFunction, Request, Response } from "express"
import { ExtractReqBody, ExtractReqParams, ExtractReqQuery, ExtractReqUser } from "~/utils/request.util"
import * as ItineraryBuilderModel from '~/models/itinerary_builder';
import { IRequestCustomParams } from "~/@types/request";
import { IItineraryBuilderItemId } from "~/@types/modules/itinerary_builder";

const createItineraryBuilderItem = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = ExtractReqUser(req); // Extract user_id from token

    const body = ExtractReqBody(req);

    const createdItem = await ItineraryBuilderModel.createItineraryBuilderItem(id, body, next);

    if (createdItem) {
        res.status(200).json({
            ...createdItem
        });
    }

}

const getAllItineraryBuilderItems = async (req: Request, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req); // Extract user_id from token

    const userItems = await ItineraryBuilderModel.getAllItineraryBuilderItems(user_id, next);

    if (userItems) {
        res.status(200).json([...userItems]);
    }

}

const updateItineraryBuilderItemById = async (req: IRequestCustomParams<IItineraryBuilderItemId>, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req); // Extract user_id from token

    const { id: item_id } = ExtractReqParams<IItineraryBuilderItemId>(req);
    const body = ExtractReqBody(req);

    const updatedItem = await ItineraryBuilderModel.updateItineraryBuilderItemById(item_id, user_id, body, next);

    if (updatedItem) {
        res.status(200).json({
            ...updatedItem
        });
    }
}

const deleteItineraryBuilderItemById = async (req: IRequestCustomParams<IItineraryBuilderItemId>, res: Response, next: NextFunction) => {

    const { id: item_id } = ExtractReqParams<IItineraryBuilderItemId>(req); // Extract user_id from token
    const deletedItem = await ItineraryBuilderModel.deleteItineraryBuilderItemById(item_id, next);

    if (deletedItem) {
        res.status(200).json({
            ...deletedItem
        })
    }

}

export {
    createItineraryBuilderItem,
    getAllItineraryBuilderItems,
    updateItineraryBuilderItemById,
    deleteItineraryBuilderItemById
}