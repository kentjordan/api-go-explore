import { NextFunction } from "express";
import { mostRatedPlacesByPreferences } from "./byPreferences/mostRatedPlaces";
import { mostVisitedPlacesByPreferences } from "./byPreferences/mostVisitedPlaces";

const getUserRecommendationByPreferences = async (type: "most-visited" | "most-rated", user_id: string, next: NextFunction) => {

    try {
        if (type === 'most-visited') {
            return await mostVisitedPlacesByPreferences(user_id, 10);
        }

        if (type === 'most-rated') {
            return await mostRatedPlacesByPreferences(user_id, 10);
        }

    } catch (error: unknown) {
        next(error);
    }
}

export default getUserRecommendationByPreferences;