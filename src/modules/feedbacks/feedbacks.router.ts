import { Router } from "express";
import { FeedbackService, PlaceFeedbackService, UserFeedbackService } from "./feedbacks.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody } from "~/middlewares/validators/request.val";
import { IUserFeedbackByIdCreateInput } from "~/@types/modules/feedbacks";
import * as FeedbacksValidator from '~/validators/feedbacks';

const router = Router();
const feedback = new FeedbackService();
const userFeedback = new UserFeedbackService();
const placeFeedback = new PlaceFeedbackService();

router.post('/user',
    jwtAuth,
    validateBody<IUserFeedbackByIdCreateInput>(FeedbacksValidator.createUserFeedbackById),
    userFeedback.createUserFeedbackById
);

router.get('/user',
    jwtAuth,
    userFeedback.getUserFeedbackById
);

router.put('/user',
    jwtAuth,
    userFeedback.updateFeedbackById
);

router.delete('/user',
    jwtAuth,
    userFeedback.deleteUserFeedbackById
);

export default router;