import { NextFunction, Request, Response } from "express";

import {
    IFeedbackService,
    IUserFeedbackService,
    IPlaceFeedbackService,
    IUserFeedbackByIdCreateInput
} from "~/@types/modules/feedbacks";

import * as FeedbackModels from '~/models/feedbacks'

import { ExtractReqBody, ExtractReqUser } from "~/utils/request.util";

class FeedbackService implements IFeedbackService {

    constructor() {

    }

    async getFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    async updateFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    async deleteFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

}

class PlaceFeedbackService extends FeedbackService implements IPlaceFeedbackService {

    constructor() {
        super();
    }

    // GET: ALL place's feedbacks
    async getPlaceFeedbacksById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // GET: ONE place's feedback
    async getPlaceFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // DELETE: ALL place's feedbacks
    async deletePlaceFeedbacksById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // DELETE: ONE place's feedback
    async deletePlaceFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

}

class UserFeedbackService extends FeedbackService implements IUserFeedbackService {

    constructor() {
        super();
    }

    async createUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const userFeedback = ExtractReqBody<IUserFeedbackByIdCreateInput>(req);
        const { id } = ExtractReqUser(req);

        const feedback = await FeedbackModels.createUserFeedbackById(userFeedback, id, next);

        if (feedback) {
            res.status(200).json({ ...feedback });
        }

    }

    // UPDATE: ONE user's feedback by its id in JWT
    async updateUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // GET: ONE user's feedback by its id in JWT
    async getUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // GET: ALL user's feedbacks by its id in JWT
    async getUserFeedbacksById(req: Request, res: Response, next: NextFunction) {

    }

    // DELETE: ONE user's feedback by its id in JWT
    async deleteUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    // DELETE: ALL user's feedback by its id in JWT
    async deleteUserFeedbacksById(req: Request, res: Response, next: NextFunction) {

    }

}

export {
    FeedbackService,
    UserFeedbackService,
    PlaceFeedbackService
}