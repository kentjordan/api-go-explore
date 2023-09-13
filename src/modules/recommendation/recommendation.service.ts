import { NextFunction, Request, Response } from "express"
import { ExtractReqUser } from "~/utils/request.util";
import * as RecommendationModels from "~/models/recommendation";

const getPublicRecommendationPlaces = async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        method: req.method,
        body: req.body
    });

}

const getUserRecommendationByPreferences = async (req: Request, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req);

    const userRecommendations = await RecommendationModels.getUserRecommendationByPreferences(user_id, next);

    if (userRecommendations) {
        res.status(200).json(userRecommendations);
    }

}

export {
    getPublicRecommendationPlaces,
    getUserRecommendationByPreferences
}