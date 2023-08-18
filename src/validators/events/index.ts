import { z } from 'zod';

const eventId = z.object({
    id: z.string().uuid()
}).strict();

const createEvent = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    image: z.array(z.string().min(1)),
    city: z.string().min(1),
    province: z.string().min(1),
    barangay: z.string().min(1),
}).strict();

const updateEvent = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    date: z.string().min(1).optional(),
    image: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    province: z.string().min(1).optional(),
    barangay: z.string().min(1).optional(),
}).strict();

export {
    eventId,
    createEvent,
    updateEvent
}