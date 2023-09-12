import { z } from 'zod';

const preferencesId = z.object({
    preferences_id: z.string().uuid()
}).strict();

const createPreferences = z.object({
    preferenced_categories: z.array(z.string()).optional()
}).strict();

const updatePreferences = z.object({
    preferenced_categories: z.array(z.string()).optional()
}).strict();

export {
    createPreferences,
    updatePreferences,
    preferencesId
}