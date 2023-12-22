import { z } from 'zod';

export const seasonIdSchema = z.object({
    season_id: z.string().uuid()
});

export type ISeasonIdSchema = z.infer<typeof seasonIdSchema>;