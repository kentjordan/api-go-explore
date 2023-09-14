import { z } from 'zod';

const whereToGoId = z.object({
    whereToGo_id: z.string().uuid()
}).strict();

const createWhereToGo = z.object({
    images: z.array(z.string()),
    description: z.string().min(1),
    title: z.string().min(1)
}).strict();

const updateWhereToGo = z.object({
    images: z.array(z.string()).optional(),
    description: z.string().min(1).optional(),
    title: z.string().min(1).optional()
}).strict();

export {
    whereToGoId,
    createWhereToGo,
    updateWhereToGo
}