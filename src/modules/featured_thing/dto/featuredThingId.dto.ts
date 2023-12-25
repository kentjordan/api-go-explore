import { z } from 'zod';

export const featuredThingId = z.object({
    id: z.string().uuid()
});

export type IFeaturedThingID = z.infer<typeof featuredThingId>;
