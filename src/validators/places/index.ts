import { z } from 'zod';

const placeId = z.object({
    place_id: z.string().uuid(),
}).strict();

const placeCategory = z.object({
    place_category: z.string().uuid(),
}).strict();

const createPlace = z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    photos: z.array(z.string()),
    contact: z.array(z.string().min(1)),
    province: z.string(),
    city: z.string(),
    barangay: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    social_links: z.record(z.string(), z.string()).optional(),
    stepsToGetThere: z.string().optional()
});

const updatePlace = z.object({
    category: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    photos: z.array(z.string().min(1)).optional(),
    contact: z.array(z.string().min(1)).optional(),
    province: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    barangay: z.string().min(1).optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    social_links: z.record(z.string(), z.string()).optional(),
    stepsToGetThere: z.string().optional()
});

export {
    placeId,
    createPlace,
    updatePlace,
    placeCategory
}