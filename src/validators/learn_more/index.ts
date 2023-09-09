import { z } from 'zod';

const learnMoreId = z.object({
    learnMore_id: z.string().uuid()
}).strict();

const createLearnMore = z.object({
    images: z.array(z.string()).optional(),
    description: z.string().min(1)
}).strict();

const updateLearnMore = z.object({
    images: z.array(z.string()).optional(),
    description: z.string().min(1)
}).strict();

export {
    createLearnMore,
    updateLearnMore,
    learnMoreId
}