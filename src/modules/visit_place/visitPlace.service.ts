import { NextFunction, Request, Response } from "express";
import { IPlaceID } from "~/@types/places";
import { IRequestCustomParams } from "~/@types/request";
import { ExtractReqParams, ExtractReqUser } from "~/utils/request.util";
import * as VisitedPlaceModels from "~/models/visit_place";

const visitPlaceByUserId = async (req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction) => {

    const { id } = ExtractReqUser(req);
    const { place_id } = ExtractReqParams<IPlaceID>(req);

    const visitedPlace = await VisitedPlaceModels.visitPlaceByUserId({ user_id: id, place_id }, next);

    if (visitedPlace) {
        res.status(200).json({
            message: `Visited ${place_id}`
        });
    }

}

const visitPlaceByUserAnon = async (req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction) => {

    const { place_id } = ExtractReqParams<IPlaceID>(req);

    const visitedPlace = await VisitedPlaceModels.visitPlaceByUserAnon(place_id, next);

    if (visitedPlace) {
        res.status(200).json({
            message: `Visited ${place_id}`
        });
    }

}

export {
    visitPlaceByUserId,
    visitPlaceByUserAnon
}