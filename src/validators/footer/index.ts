import { z } from 'zod';

const footerId = z.object({
    footer_id: z.string().uuid()
}).strict();

const createFooter = z.object({
    description: z.string().min(1)
}).strict();

const updateFooter = z.object({
    description: z.string().min(1).optional()
}).strict();

export {
    createFooter,
    updateFooter,
    footerId
}