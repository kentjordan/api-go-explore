import { z } from 'zod';

const placeId = z.object({
    id: z.string(),
});

const createPlace = z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    photos: z.array(z.string()),
    contact: z.string().max(16),
    province: z.string(),
    city: z.string(),
    barangay: z.string()
});

export {
    placeId,
    createPlace
}