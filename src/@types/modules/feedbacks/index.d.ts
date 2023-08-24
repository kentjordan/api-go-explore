import { z } from 'zod';
import { feedbackId, createUserFeedback, updateUserFeedbackById } from '~/validators/feedbacks';

type IFeedbackID = z.infer<typeof feedbackId>;
type IUserFeedbackCreateInput = z.infer<typeof createUserFeedback>;
type IUserFeedbackUpdateInput = z.infer<typeof updateUserFeedbackById>;

export {
    IFeedbackID,
    IUserFeedbackCreateInput,
    IUserFeedbackUpdateInput
}