import { z } from 'zod';

const itineraryId = z.object({
    id: z.string().uuid()
}).strict();

const itineraryUserId = z.object({
    user_id: z.string().uuid()
}).strict();

const createItineraryItem = z.object({
    place_id: z.string().uuid(),
    user_id: z.string().uuid()
}).strict();

const updateItineraryItem = z.object({}).strict();

export {
    itineraryId,
    itineraryUserId,
    createItineraryItem,
    updateItineraryItem
}