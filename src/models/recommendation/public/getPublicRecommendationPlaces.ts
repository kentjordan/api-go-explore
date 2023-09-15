import { NextFunction } from "express";
import getPublicRecommendationPlacesByPopularity from "./getPublicRecommendationPlacesByPopularity";
import getRecommendationByLatestAdded from "./getRecommendationByLatestAdded";


const getPublicRecommendationPlaces = async (type: string, next: NextFunction) => {

    try {

        switch (type) {
            case 'popular':
                return getPublicRecommendationPlacesByPopularity(next);
            case 'latest':
                return getRecommendationByLatestAdded(next);
            case 'season':
                // TODO: Recommendation for each seasons
                break;
            default:
                return getRecommendationByLatestAdded(next);
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getPublicRecommendationPlaces;