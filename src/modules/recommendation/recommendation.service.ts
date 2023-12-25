import { NextFunction, Request, Response } from "express"
import { ExtractReqParams, ExtractReqQuery, ExtractReqUser } from "~/utils/request.util";
import * as RecommendationModels from "~/models/recommendation";

const getPublicRecommendationPlaces = async (req: Request, res: Response, next: NextFunction) => {

    const { type } = req.query as { type: string };

    const publicRecommendations = await RecommendationModels.getPublicRecommendationPlaces(type, next);

    if (publicRecommendations) {
        res.status(200).json([...publicRecommendations]);
    }

}

type ITypeRecommendation = "most-visited" | "most-rated"

const getUserRecommendationByPreferences = async (req: Request, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req);
    const { type } = ExtractReqQuery(req);

    const userRecommendations = await RecommendationModels.getUserRecommendationByPreferences(type as ITypeRecommendation, user_id, next);

    if (userRecommendations) {
        res.status(200).json([...userRecommendations]);
    }

}

const getUserRecommendationByHistory = async (req: Request, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req);
    const { type } = ExtractReqQuery(req);

    const userRecommendations = await RecommendationModels.getUserRecommendationByHistory(type as ITypeRecommendation, user_id, next);

    if (userRecommendations) {
        res.status(200).json(userRecommendations);
    }

}


export {
    getPublicRecommendationPlaces,
    getUserRecommendationByPreferences,
    getUserRecommendationByHistory
}