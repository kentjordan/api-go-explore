import { Router } from "express";
import { PlaceFeedbackService, UserFeedbackService, createFeedbackReply, getAllFeedbacks, getFeedbackReplies } from "./feedbacks.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams, validateQuery } from "~/middlewares/validators/request.val";
import { IUserFeedbackCreateInput } from "~/@types/modules/feedbacks";
import * as FeedbacksValidator from '~/validators/feedbacks';
import { IFeedbackID } from "~/@types/modules/feedbacks";
import { IPlaceID } from "~/@types/places";
import { placeId } from '~/validators/places'
import { ICreateFeedbackReply, createFeedbackReplySchema } from "~/validators/feedbacks/replies";

const router = Router();
const userFeedback = new UserFeedbackService();
const placeFeedback = new PlaceFeedbackService();

router.post('/user',
    jwtAuth,
    validateBody<IUserFeedbackCreateInput>(FeedbacksValidator.createUserFeedback),
    userFeedback.createUserFeedback
);

router.put('/user',
    jwtAuth,
    validateBody<IFeedbackID>(FeedbacksValidator.updateUserFeedbackById),
    userFeedback.updateUserFeedbackById
);

router.delete('/user',
    jwtAuth,
    validateBody<IFeedbackID>(FeedbacksValidator.feedbackId),
    userFeedback.deleteUserFeedbackById
);

router.get('/place/:place_id',
    validateParams<IPlaceID>(placeId),
    placeFeedback.getPlaceFeedbacksById
);

router.get('/user/:user_id',
    jwtAuth,
    userFeedback.getUserFeedbacksById
);

router.get('/',
    getAllFeedbacks
);

router.post('/:feedback_id/replies',
    jwtAuth,
    validateParams<IFeedbackID>(FeedbacksValidator.feedbackId),
    validateBody<ICreateFeedbackReply>(createFeedbackReplySchema),
    createFeedbackReply
);

router.get('/:feedback_id/replies',
    jwtAuth,
    getFeedbackReplies
);

export default router;