import { z } from 'zod';

export const createFeaturedThingScheme = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    wheretogo_id: z.string().uuid(),
    photos: z.array(z.string())
}).strict();

export type ICreateFeaturedThingDto = z.infer<typeof createFeaturedThingScheme>;
