import { z } from 'zod';

const feedbackId = z.object({
    feedback_id: z.string().uuid()
}).strict();

const createUserFeedback = z.object({
    rating: z.number(),
    comment: z.string().min(1),
    place_id: z.string().uuid()
}).strict();

const updateUserFeedbackById = z.object({
    rating: z.number().optional(),
    comment: z.string().min(1).optional(),
    feedback_id: z.string().uuid()
}).strict();


export {
    feedbackId,
    createUserFeedback,
    updateUserFeedbackById
}