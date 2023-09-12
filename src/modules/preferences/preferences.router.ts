import { Router } from 'express';
import * as PreferencesServices from './preferences.service';
import * as PreferencesValidators from '~/validators/preferences'
import { jwtAuth } from '~/middlewares/auth/jwtAuth';
import { validateBody, validateParams } from '~/middlewares/validators/request.val';
import { IPreferencesCreateInput, IPreferencesIDInput } from '~/@types/modules/preferences';

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IPreferencesCreateInput>(PreferencesValidators.createPreferences),
    PreferencesServices.createPreferences
);

// Get preferenced categories by logged in USER ID
router.get('/',
    jwtAuth,
    PreferencesServices.getPreferencesByUserId
);

// update preferenced categories by logged in USER ID and preferenced id
router.put('/:preferences_id',
    jwtAuth,
    validateParams<IPreferencesIDInput>(PreferencesValidators.preferencesId),
    PreferencesServices.updatePreferencesByUserId
);

router.delete('/:preferences_id',
    jwtAuth,
    validateParams<IPreferencesIDInput>(PreferencesValidators.preferencesId),
    PreferencesServices.deletePreferencesByUserId
);

export default router;