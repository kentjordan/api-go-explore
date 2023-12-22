import { NextFunction, Request, Response } from "express";

import {
    IFeedbackID,
    IUserFeedbackUpdateInput,
    IUserFeedbackCreateInput
} from "~/@types/modules/feedbacks";

import { IPlaceID } from "~/@types/places";

import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";
import { IUserID } from "~/@types/users";

import * as FeedbackModels from '~/models/feedbacks'

import { ExtractReqBody, ExtractReqParams, ExtractReqUser } from "~/utils/request.util";
import { ICreateFeedbackReply } from "~/validators/feedbacks/replies";

class PlaceFeedbackService {

    constructor() { }

    async getPlaceFeedbacksById(req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction): Promise<void> {

        const { place_id } = ExtractReqParams<IPlaceID>(req);

        const placeFeedbacks = await FeedbackModels.getPlaceFeedbacksById(place_id, next);
        const placeAggregatedFeedbacks = await FeedbackModels.getPlaceFeedbacksByAggregation(place_id, next);
        const placeAvgFeedback = await FeedbackModels.getPlaceAverageFeedback(place_id, next);

        if (placeFeedbacks) {
            res.status(200).json({
                avg: placeAvgFeedback,
                all: [...placeFeedbacks],
                aggregated: placeAggregatedFeedbacks,
            });
        }

    }

}

class UserFeedbackService {

    constructor() { }

    // ** Logged In user through JWT
    async createUserFeedback(req: IRequestCustomQuery<IPlaceID>, res: Response, next: NextFunction): Promise<void> {

        const userFeedback = ExtractReqBody<IUserFeedbackCreateInput>(req);
        const { id } = ExtractReqUser(req);

        const feedback = await FeedbackModels.createUserFeedbackById(userFeedback, id, next);

        if (feedback?.isLimitExceeded) {

            res.status(400).json({
                ...feedback,
                message: 'Can\'t create more than 1 feedback to the place.',
                type: 'LIMIT_EXCEEDED',
            });

            return;

        }

        if (feedback) {
            res.status(200).json({
                ...feedback,
                message: 'Feedback has been successfully created.',
                type: 'CREATE',
            });
        }

    }

    // ** Logged In user through JWT
    // ID is from JWT
    async updateUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const feedbackUpdateInput = ExtractReqBody<IUserFeedbackUpdateInput>(req);
        const user = ExtractReqUser(req);

        const updatedUserFeedback = await FeedbackModels.updateUserFeedbackById(user.id, feedbackUpdateInput, next);

        if (updatedUserFeedback) {
            res.status(200).json({
                ...updatedUserFeedback,
                message: 'User\'s feedback has been successfully updated.',
                type: 'UPDATE'
            });
        }

    }

    // ** Logged In user through JWT
    // ID is from JWT
    // Body: feedback_id
    async deleteUserFeedbackById(req: IRequestCustomBody<IFeedbackID>, res: Response, next: NextFunction): Promise<void> {

        const { feedback_id } = ExtractReqBody<IFeedbackID>(req);
        const user = ExtractReqUser(req);

        const deletedUserFeedback = await FeedbackModels.deleteUserFeedbackById(user, feedback_id, next);

        if (deletedUserFeedback) {
            res.status(200).json({
                ...deletedUserFeedback,
                message: 'User\'s feedback has been successfully deleted.',
                type: 'DELETE'
            });
        }

    }

    // ** The ID is from params
    async getUserFeedbacksById(req: IRequestCustomParams<IUserID>, res: Response, next: NextFunction) {

        const { user_id } = ExtractReqParams<IUserID>(req);

        const userFeedbacks = await FeedbackModels.getUserFeedbacksById(user_id, next);

        if (userFeedbacks && userFeedbacks?.length > 0) {
            res.status(200).json([...userFeedbacks]);
            return;
        }

        res.status(404).json({
            message: 'There\'s no feedbacks found of the user.',
        });

    }
}

const getAllFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
    const allFeedbacks = await FeedbackModels.getAllFeedbacks(next);

    if (allFeedbacks) {
        res.status(200).json([...allFeedbacks]);
    }
}

const getFeedbackReplies = async (req: Request<IFeedbackID>, res: Response, next: NextFunction) => {

    const { feedback_id } = ExtractReqParams<IFeedbackID>(req);

    const replies = await FeedbackModels.getFeedbackReplies(feedback_id);

    if (replies) {
        res.status(200).json([...replies]);
    }

}

const createFeedbackReply = async (req: Request<IFeedbackID>, res: Response, next: NextFunction) => {

    const { feedback_id } = ExtractReqParams<IFeedbackID>(req);
    const { reply_comment } = ExtractReqBody<ICreateFeedbackReply>(req);
    const { id } = ExtractReqUser(req);

    const createdFeedbackReply = await FeedbackModels.createFeedbackReply({
        feedback_id,
        reply_comment,
        user_id: id
    }, next);

    if (createdFeedbackReply) {
        res.status(200).json({ ...createdFeedbackReply });
    }

}

export {
    UserFeedbackService,
    PlaceFeedbackService,
    getAllFeedbacks,
    getFeedbackReplies,
    createFeedbackReply
}