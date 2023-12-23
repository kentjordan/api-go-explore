import { z } from 'zod';

export const createNewsletterSchema = z.object({
    users: z.array(z.object({
        user_id: z.string().uuid(),
        user_email: z.string().email(),
    }))
});

export type ICreateNewsLetterDto = z.infer<typeof createNewsletterSchema>;
