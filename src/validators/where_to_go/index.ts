import { z } from 'zod';

const whereToGoId = z.object({
    whereToGo_id: z.string().uuid()
}).strict();

const createWhereToGo = z.object({
    images: z.array(z.string()),
    description: z.string().min(1),
    title: z.string().min(1),
    hotlines: z.record(z.string(), z.any()).optional(),
});

const updateWhereToGo = z.object({
    images: z.array(z.string()).optional(),
    description: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    hotlines: z.record(z.string(), z.any()).optional(),
});

export {
    whereToGoId,
    createWhereToGo,
    updateWhereToGo
}