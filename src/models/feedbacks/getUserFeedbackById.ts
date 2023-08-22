import { NextFunction } from "express";

async function getUserFeedbackById(id: string, next: NextFunction) {
    try {
            
    } catch (error: unknown) {
        next(error);
    }
}

export default getUserFeedbackById;