import { NextFunction, Response } from "express";
import { IRequestCustomQuery } from "~/@types/request";
import { ExtractReqQuery } from "~/utils/request.util";
import * as AnalyticsModels from "~/models/analytics"

interface IMostVisitedPlace {
    category: string,
    limit: string
}

interface IMostRatedPlace {
    category: string,
    limit: string
}

const getMostVisitedPlace = async (req: IRequestCustomQuery<IMostVisitedPlace>, res: Response, next: NextFunction) => {

    const { limit, category } = ExtractReqQuery<IMostVisitedPlace>(req);

    if (category) {

        const mostVisitedPlaceByCategory = await AnalyticsModels.getMostVisitedPlaceByCategory(next, parseInt(limit), category);

        if (mostVisitedPlaceByCategory) {
            res.status(200).json(mostVisitedPlaceByCategory);
            return;
        }

    }

    const overallMostVisitedPlace = await AnalyticsModels.getOverallMostVisitedPlace(next, parseInt(limit));

    if (overallMostVisitedPlace) {
        res.status(200).json(overallMostVisitedPlace);
        return;
    }

}

const getMostRatedPlace = async (req: IRequestCustomQuery<IMostRatedPlace>, res: Response, next: NextFunction) => {


    const { limit, category } = ExtractReqQuery<IMostRatedPlace>(req);


    if (category) {
        const mostRatedPlacesByCategory = await AnalyticsModels.getMostRatedPlaceByCategory(next, parseInt(limit), category);
        res.status(200).json(mostRatedPlacesByCategory)
        return;
    }

    res.status(200).json({ messsage: 'No category was provided' });

}

export {
    getMostVisitedPlace,
    getMostRatedPlace
}