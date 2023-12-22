import { z } from 'zod';

export const createFeedbackReplySchema = z.object({
    reply_comment: z.string().min(1),
}).strict();

export type ICreateFeedbackReply = z.infer<typeof createFeedbackReplySchema>;