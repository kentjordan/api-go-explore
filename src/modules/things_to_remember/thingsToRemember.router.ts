import { Router } from "express";
import * as ThingsToRememberServices from './thingsToRemember.service';
import * as ThingToRememberValidators from '~/validators/things_to_remember';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IThingToRememberCreateInput, IThingToRememberIDInput } from "~/@types/modules/things_to_remember";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IThingToRememberCreateInput>(ThingToRememberValidators.createThingToRemember),
    ThingsToRememberServices.createThingToRemember
);

router.get('/',
    ThingsToRememberServices.getAllThingsToRemember
);

router.get('/:thingsToRemember_id',
    validateParams<IThingToRememberIDInput>(ThingToRememberValidators.thingToRememberId),
    ThingsToRememberServices.getThingToRememberById
);

router.put('/:thingsToRemember_id',
    jwtAuth,
    validateParams<IThingToRememberIDInput>(ThingToRememberValidators.thingToRememberId),
    ThingsToRememberServices.updateThingToRememberById
);

router.delete('/:thingsToRemember_id',
    jwtAuth,
    validateParams<IThingToRememberIDInput>(ThingToRememberValidators.thingToRememberId),
    ThingsToRememberServices.deleteThingToRememberById
);

export default router;