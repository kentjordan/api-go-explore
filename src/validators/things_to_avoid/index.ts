import { z } from 'zod';

const thingToAvoidId = z.object({
    thingsToAvoid_id: z.string().uuid()
}).strict();

const createThingToAvoid = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1),
    description: z.string().min(1)
}).strict();

const updateThingToAvoid = z.object({
    images: z.array(z.string()).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional()
}).strict();

export {
    createThingToAvoid,
    updateThingToAvoid,
    thingToAvoidId
}