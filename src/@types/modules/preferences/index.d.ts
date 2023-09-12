import { z } from 'zod';
import { createPreferences, preferencesId, updatePreferences } from '~/validators/preferences';

type IPreferencesIDInput = z.infer<typeof preferencesId>;
type IPreferencesCreateInput = z.infer<typeof createPreferences>;
type IPreferencesUpdateInput = z.infer<typeof updatePreferences>;

export {
    IPreferencesIDInput,
    IPreferencesCreateInput,
    IPreferencesUpdateInput
}