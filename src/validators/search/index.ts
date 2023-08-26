import { z } from 'zod';

const searchQuery = z.object({
    q: z.string().min(2)
}).strict();

export {
    searchQuery
}