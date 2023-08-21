import { z } from 'zod';

const createUserFeedbackById = z.object({
    rating: z.number(),
    comment: z.string().min(1),
    place_id: z.string().uuid()
}).strict();

export {
    createUserFeedbackById
}