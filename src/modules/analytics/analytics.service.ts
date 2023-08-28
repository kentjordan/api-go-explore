import { NextFunction, Response } from "express";
import { IRequestCustomQuery } from "~/@types/request";
import { ExtractReqQuery } from "~/utils/request.util";
import * as AnalyticsModels from "~/models/analytics"

interface IMostVisitedPlace {
    limit: string
}

const getOverallMostVisitedPlace = async (req: IRequestCustomQuery<IMostVisitedPlace>, res: Response, next: NextFunction) => {

    const { limit } = ExtractReqQuery<IMostVisitedPlace>(req);

    const overallMostVisitedPlace = await AnalyticsModels.getOverallMostVisitedPlace(next, parseInt(limit));

    if (overallMostVisitedPlace) {
        res.status(200).json(overallMostVisitedPlace);
    }

}

export {
    getOverallMostVisitedPlace
}