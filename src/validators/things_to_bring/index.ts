import { z } from 'zod';

const thingToBringId = z.object({
    thingsToBring_id: z.string().uuid()
}).strict();

const createThingToBring = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1),
    description: z.string().min(1)
}).strict();

const updateThingToBring = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional()
}).strict();

export {
    createThingToBring,
    updateThingToBring,
    thingToBringId
}