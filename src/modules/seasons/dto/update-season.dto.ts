import { z } from 'zod';

export const updateSeasonschema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    from_date: z.string().optional(),
    to_date: z.string().optional(),
});

export type IUpdateSeasonDto = z.infer<typeof updateSeasonschema>;