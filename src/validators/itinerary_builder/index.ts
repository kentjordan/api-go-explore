import { z } from 'zod';

const itinerarBuilderItemyId = z.object({
    id: z.string().uuid()
}).strict();

const itineraryBuilderItemUserId = z.object({
    user_id: z.string().uuid()
}).strict();

const createItineraryBuilderItem = z.object({
    place_name: z.string(),
    event_date: z.string(),
    event_color: z.string(),
    event_icon: z.string(),
    notes: z.string().optional()
}).strict();

const updateItineraryBuilderItem = z.object({
    place_name: z.string().optional(),
    event_date: z.string().optional(),
    event_color: z.string().optional(),
    event_icon: z.string().optional(),
    notes: z.string().optional()
}).strict();

export {
    itinerarBuilderItemyId,
    itineraryBuilderItemUserId,
    createItineraryBuilderItem,
    updateItineraryBuilderItem
}