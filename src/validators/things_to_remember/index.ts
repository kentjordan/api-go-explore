import { z } from 'zod';

const thingToRememberId = z.object({
    thingsToRemember_id: z.string().uuid()
}).strict();

const createThingToRemember = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1),
    description: z.string().min(1)
}).strict();

const updateThingToRemember = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional()
}).strict();

export {
    createThingToRemember,
    updateThingToRemember,
    thingToRememberId
}