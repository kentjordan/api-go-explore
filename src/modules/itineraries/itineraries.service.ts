import { Request, Response, NextFunction } from "express";
import { IItineraryCreateInput, IItineraryID, IItineraryUserID } from "~/@types/itinerary";
import { ExtractReqBody, ExtractReqParams, ExtractReqUser } from "~/utils/request.util";
import * as ItineraryModels from "~/models/itinerary";
import { IRequestCustomParams } from "~/@types/request";

export default class ItinerariesService {

    async createItem(req: Request, res: Response, next: NextFunction) {

        const itemReq = ExtractReqBody<IItineraryCreateInput>(req);

        const item = await ItineraryModels.createItineraryItem(itemReq, next);

        if (item?.hasDuplicate) {
            res.status(409).json({
                ...item,
                message: "Item has already been added in itinerary.",
                type: "DUPLICATE"
            });

            return;
        }

        if (item) {
            res.status(201).json({
                ...item,
                message: "Itinerary item has been successfully created.",
                type: "CREATE"
            });

            return;
        }
    }

    async deleteItemById(req: IRequestCustomParams<IItineraryID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IItineraryID>(req);
        const { id: user_id } = ExtractReqUser(req);

        const item = await ItineraryModels.deleteItemById(id, user_id, next);

        if (item) {
            res.status(200).json({
                ...item,
                message: 'Itinerary item has been successfully deleted.',
                type: 'DELETE'
            });
        }
    }

    async getItemById(req: IRequestCustomParams<IItineraryID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IItineraryID>(req);

        const item = await ItineraryModels.getItemByUserId(id, next);

        if (item) {
            res.status(200).json({ ...item });
        }

    }

    // Get all items by user logged in
    async getAllItemsByUserId(req: IRequestCustomParams<IItineraryUserID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqUser(req);

        const userItems = await ItineraryModels.getAllItemsByUserId(id, next);

        if (userItems) {
            res.status(200).json(userItems);
        }

    }

    async updateItemById(req: Request, res: Response, next: NextFunction) { }

    async getAllItinerary(req: Request, res: Response, next: NextFunction) {

        const allItinerary = await ItineraryModels.getAllItinerary(next);

        if (allItinerary) {
            res.status(200).json([...allItinerary]);
        }
    }

}