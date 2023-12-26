import { z } from 'zod';

export const updateFeaturedThingScheme = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    wheretogo_id: z.string().uuid().optional(),
    photos: z.array(z.string()).optional()
}).strict();

export type IUpdateFeaturedThingDto = z.infer<typeof updateFeaturedThingScheme>;
