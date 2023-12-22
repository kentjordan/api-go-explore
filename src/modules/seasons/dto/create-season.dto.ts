import { z } from 'zod';

export const createSeasonSchema = z.object({
    name: z.string(),
    description: z.string(),
    from_date: z.string(),
    to_date: z.string(),
});

export type ICreateSeasonDto = z.infer<typeof createSeasonSchema>;
